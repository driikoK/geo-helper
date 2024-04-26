'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import {
  ButtonsWrapper,
  ControlWrapper,
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
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useFormik } from 'formik';
import { initialValues } from './const';
import { convertToMGRS, convertToUTM, convertToWGS84 } from './utils';
import Button from '@/components/Button';

let DynamicMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <Loading>Завантаження...</Loading>,
});

const ElevationPage: FunctionComponent = () => {
  const [marker, setMarker] = useState({
    lat: 49.838203879003814,
    lng: 24.04756701152707,
  });
  const [isPopOpen, setPopOpen] = useState<boolean>(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => console.log(values),
  });

  useEffect(() => {
    const wgs84 = convertToWGS84(marker.lat, marker.lng);
    const utm = convertToUTM(marker.lat, marker.lng);
    const mgrs = convertToMGRS(marker.lat, marker.lng);

    formik.setFieldValue('wgs84', wgs84);
    formik.setFieldValue('utm', utm);
    formik.setFieldValue('mgrs', mgrs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker]);

  const handleLocationButton = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMarker({ lat, lng });
        DynamicMap = dynamic(() => import('@/components/Map'), {
          ssr: false,
          loading: () => <Loading>Завантаження...</Loading>,
        });
      },
      (error) => {
        console.error('Помилка отримання геолокації:', error);
      }
    );
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
  const generateTextFile = (text: string) => {
    const data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const downloadLink = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = 'result.txt';
    link.click();
  };

  return (
    <PageContainer>
      <PageWrapper>
        <DynamicMap
          marker={marker}
          callback={(marker) => setMarker({ lat: marker.lat, lng: marker.lng })}
        />
        <ControlWrapper>
          <TitleWrapper>
            <Title>Вибрана точка:</Title>
            <IconButton sx={{ padding: 0 }} onClick={handleLocationButton}>
              <MyLocationIcon color="primary" />
            </IconButton>
          </TitleWrapper>
          <TitleWrapper>
            <div>
              <Paragraph>
                Широта: <Underline>{marker.lat}</Underline>;
              </Paragraph>
              <br />
              <Paragraph>
                Довгота: <Underline>{marker.lng}</Underline>;
              </Paragraph>
            </div>
            <IconButton
              onClick={() =>
                copyToClipboard(`Широта: ${marker.lat}; Довгота: ${marker.lng}`)
              }
              sx={{ padding: 0 }}
            >
              <ContentCopyIcon />
            </IconButton>
          </TitleWrapper>
          <TextField
            name="wgs84"
            variant="standard"
            label="WGS84"
            value={formik.values.wgs84}
            onChange={formik.handleChange}
          />
          <TextField
            name="utm"
            variant="standard"
            label="UTM"
            value={formik.values.utm}
            onChange={formik.handleChange}
          />
          <TextField
            name="mgrs"
            variant="standard"
            label="MGRS"
            value={formik.values.mgrs}
            onChange={formik.handleChange}
          />
          <ButtonsWrapper>
            <Button
              variant="contained"
              startIcon={<ContentCopyIcon />}
              onClick={() =>
                copyToClipboard(
                  `WGS84: ${formik.values.wgs84}\nUTM: ${formik.values.utm}\nMGRS: ${formik.values.mgrs}`
                )
              }
            >
              Скопіювати
            </Button>
            <Button
              variant="contained"
              startIcon={<CloudDownloadIcon />}
              onClick={() =>
                generateTextFile(
                  `WGS84: ${formik.values.wgs84}\nUTM: ${formik.values.utm}\nMGRS: ${formik.values.mgrs}`
                )
              }
            >
              Завантажити
            </Button>
          </ButtonsWrapper>
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

export default ElevationPage;
