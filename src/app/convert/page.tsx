/* eslint-disable react-hooks/exhaustive-deps */
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
import { useFormik } from 'formik';
import { initialValues } from './const';
import {
  convertMGRSToLatLng,
  convertToMGRS,
  convertToUTM,
  convertToWGS84,
  convertUTMToLatLng,
  convertWGS84ToLatLng,
} from './utils';
import Button from '@/components/Button';

import MyLocationIcon from '@mui/icons-material/MyLocation';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CalculateIcon from '@mui/icons-material/Calculate';
import { IMarkers } from '@/components/Map/types';

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
  }, [marker]);

  const handleMgrsInput = () => {
    const lngLat = convertMGRSToLatLng(formik.values.mgrs);
    if (lngLat) {
      const wgs84 = convertToWGS84(lngLat[1], lngLat[0]);
      const utm = convertToUTM(lngLat[1], lngLat[0]);

      formik.setFieldValue('wgs84', wgs84);
      formik.setFieldValue('utm', utm);
      setMarker({ lat: lngLat[1], lng: lngLat[0] });
      DynamicMap = dynamic(() => import('@/components/Map'), {
        ssr: false,
        loading: () => <Loading>Завантаження...</Loading>,
      });
    }
  };

  const setMarkerWithTypeCheck = (marker: IMarkers | {
    lat: number;
    lng: number;
  }) => {
    if ('lat' in marker && 'lng' in marker) {
      setMarker({ lat: marker.lat, lng: marker.lng });
    } else {
      console.log('Marker is not of type LatLng');
    }
  };

  const handleUtmInput = () => {
    const latLng = convertUTMToLatLng(formik.values.utm);
    if (latLng) {
      const wgs84 = convertToWGS84(latLng.lat, latLng.lng);
      const mgrs = convertToMGRS(latLng.lat, latLng.lng);

      formik.setFieldValue('wgs84', wgs84);
      formik.setFieldValue('mgrs', mgrs);
      setMarker({ lat: latLng.lat, lng: latLng.lng });
      DynamicMap = dynamic(() => import('@/components/Map'), {
        ssr: false,
        loading: () => <Loading>Завантаження...</Loading>,
      });
    }
  };

  const handleWgs84Input = () => {
    const latLng = convertWGS84ToLatLng(formik.values.wgs84);
    if (latLng) {
      const utm = convertToUTM(latLng.lat, latLng.lng);
      const mgrs = convertToMGRS(latLng.lat, latLng.lng);

      formik.setFieldValue('utm', utm);
      formik.setFieldValue('mgrs', mgrs);
      setMarker({ lat: latLng.lat, lng: latLng.lng });
      DynamicMap = dynamic(() => import('@/components/Map'), {
        ssr: false,
        loading: () => <Loading>Завантаження...</Loading>,
      });
    }
  };

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
          callback={(marker) => setMarkerWithTypeCheck(marker)}
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
          <TitleWrapper>
            <TextField
              name="wgs84"
              variant="standard"
              label="WGS84"
              value={formik.values.wgs84}
              onChange={formik.handleChange}
              sx={{width: '90%'}}
            />
            <IconButton sx={{ padding: 0 }} onClick={handleWgs84Input}>
              <CalculateIcon />
            </IconButton>
          </TitleWrapper>
          <TitleWrapper>
            <TextField
              name="utm"
              variant="standard"
              label="UTM"
              value={formik.values.utm}
              onChange={formik.handleChange}
              sx={{width: '90%'}}
            />
            <IconButton sx={{ padding: 0 }} onClick={handleUtmInput}>
              <CalculateIcon />
            </IconButton>
          </TitleWrapper>
          <TitleWrapper>
            <TextField
              name="mgrs"
              variant="standard"
              label="MGRS"
              value={formik.values.mgrs}
              onChange={formik.handleChange}
              sx={{width: '90%'}}
            />
            <IconButton sx={{ padding: 0 }} onClick={handleMgrsInput}>
              <CalculateIcon />
            </IconButton>
          </TitleWrapper>
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
