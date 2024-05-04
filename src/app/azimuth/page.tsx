'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import {
  ControlWrapper,
  InputWrapper,
  Loading,
  PageContainer,
  PageWrapper,
  Paragraph,
  Title,
  TitleWrapper,
  Underline,
} from './styles';
import dynamic from 'next/dynamic';
import React from 'react';
import { IconButton, Snackbar, TextField } from '@mui/material';
import Button from '@/components/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IMarkers } from '@/components/Map/types';
import { getAzimuth } from './utils';
import { useFormik } from 'formik';
import { initialValues } from './const';

let DynamicMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <Loading>Завантаження...</Loading>,
});

const AzimuthPage: FunctionComponent = () => {
  const [marker, setMarker] = useState<IMarkers>({
    lat1: null,
    lng1: null,
    lat2: null,
    lng2: null,
  });
  const [azimuth, setAzimuth] = useState<number>(0);
  const [isPopOpen, setPopOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => console.log(values),
  });

  useEffect(() => {
    if (marker.lat1 && marker.lng1 && marker.lat2 && marker.lng2) {
      const azimuth = getAzimuth(
        { lat: marker.lat1, lng: marker.lng1 },
        { lat: marker.lat2, lng: marker.lng2 }
      );
      setAzimuth(Number(azimuth));
    }
  }, [marker]);

  const handleSubmitButton = () => {
    setMarker({
      lat1: formik.values.lat1,
      lng1: formik.values.lng1,
      lat2: formik.values.lat2,
      lng2: formik.values.lng2,
    });
    DynamicMap = dynamic(() => import('@/components/Map'), {
      ssr: false,
      loading: () => <Loading>Завантаження...</Loading>,
    });
  };

  const copyToClipboard = (string: string) => {
    try {
      navigator.clipboard.writeText(string);
    } catch (e) {
      console.log('copy error: ' + e);
    } finally {
      setPopOpen(true);
    }
  };

  const setMarkerWithTypeCheck = (marker: IMarkers | {
    lat: number;
    lng: number;
  }) => {
    if ('lat1' in marker && 'lng1' in marker) {
      setMarker(marker);
    } else {
      console.log('Marker is not of type IMarkers');
    }
  };

  return (
    <PageContainer data-testid="azimuth-page">
      <PageWrapper>
        <DynamicMap
          marker={{
            lat: marker.lat1 ? marker.lat1 : 49.838203879003814,
            lng: marker.lng1 ? marker.lng1 : 24.04756701152707,
          }}
          callback={(marker) => setMarkerWithTypeCheck(marker)}
          multiple={true}
          markers={marker}
        />
        <ControlWrapper>
          <Title>Вибрані точки:</Title>
          <TitleWrapper>
            <div>
              <Paragraph>
                Широта 1:{' '}
                <Underline>
                  {marker.lat1 ? marker.lat1 : 'не встановлено'}
                </Underline>
                ;
              </Paragraph>
              <br />
              <Paragraph>
                Довгота 1:{' '}
                <Underline>
                  {marker.lng1 ? marker.lng1 : 'не встановлено'}
                </Underline>
                ;
              </Paragraph>
              <br />
              <br />
              <Paragraph>
                Широта 2:{' '}
                <Underline>
                  {marker.lat2 ? marker.lat2 : 'не встановлено'}
                </Underline>
                ;
              </Paragraph>
              <br />
              <Paragraph>
                Довгота 2:{' '}
                <Underline>
                  {marker.lng2 ? marker.lng2 : 'не встановлено'}
                </Underline>
                ;
              </Paragraph>
            </div>
            <IconButton
              onClick={() =>
                copyToClipboard(
                  `Широта 1: ${
                    marker.lat1 ? marker.lat1 : 'не встановлено'
                  }; Довгота 1: ${
                    marker.lng1 ? marker.lng1 : 'не встановлено'
                  }\nШирота 2: ${
                    marker.lat2 ? marker.lat2 : 'не встановлено'
                  }; Довгота 2: ${marker.lng2 ? marker.lng2 : 'не встановлено'}`
                )
              }
              sx={{ padding: 0 }}
            >
              <ContentCopyIcon />
            </IconButton>
          </TitleWrapper>
          <Title>Азимут:</Title>
          <TitleWrapper>
            <Paragraph>
              {marker.lat1 && marker.lng1 && marker.lat2 && marker.lng2
                ? `${azimuth}°`
                : 'Точки не вибрані'}
            </Paragraph>
            <IconButton
              onClick={() =>
                copyToClipboard(
                  `${
                    marker.lat1 && marker.lng1 && marker.lat2 && marker.lng2
                      ? `${azimuth}°`
                      : 'Точки не вибрані'
                  }`
                )
              }
              sx={{ padding: 0 }}
            >
              <ContentCopyIcon />
            </IconButton>
          </TitleWrapper>
          <Title>Ввести вручну координати:</Title>
          <InputWrapper>
            <TextField
              name="lat1"
              variant="standard"
              type="number"
              label="Широта 1"
              value={formik.values.lat1 != null ? formik.values.lat1 : ''}
              onChange={formik.handleChange}
            />
            <TextField
              name="lng1"
              variant="standard"
              type="number"
              label="Довгота 1"
              value={formik.values.lng1 != null ? formik.values.lng1 : ''}
              onChange={formik.handleChange}
            />
          </InputWrapper>
          <InputWrapper>
            <TextField
              name="lat2"
              variant="standard"
              type="number"
              label="Широта 2"
              value={formik.values.lat2 != null ? formik.values.lat2 : ''}
              onChange={formik.handleChange}
            />
            <TextField
              name="lng2"
              variant="standard"
              type="number"
              label="Довгота 2"
              value={formik.values.lng2 != null ? formik.values.lng2 : ''}
              onChange={formik.handleChange}
            />
          </InputWrapper>
          <Button
            variant="contained"
            disabled={
              !formik.values.lat1 ||
              !formik.values.lng1 ||
              !formik.values.lat2 ||
              !formik.values.lng2
            }
            onClick={handleSubmitButton}
          >
            Розрахувати
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isPopOpen}
            autoHideDuration={2000}
            onClose={() => setPopOpen(false)}
            message="Скопійовано"
          />
        </ControlWrapper>
      </PageWrapper>
    </PageContainer>
  );
};

export default AzimuthPage;
