'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import {
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
import { elevationApi } from './consts';
import { LocationDataType } from './types';
import { IconButton, TextField } from '@mui/material';
import Button from '@/components/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

let DynamicMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <Loading>Завантаження...</Loading>,
});

const ElevationPage: FunctionComponent = () => {
  const [marker, setMarker] = useState({
    lat: 49.838203879003814,
    lng: 24.04756701152707,
  });
  const [elevation, setElevation] = useState<number>(312);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [isElevationLoad, setElevationLoad] = useState<boolean>(false);
  const [elevationError, setElevationError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setElevationLoad(true);
      setElevationError('');
      try {
        const response = await fetch(
          `${elevationApi}${marker.lat},${marker.lng}`
        );
        const result: LocationDataType = await response.json();
        setElevation(result.results[0].elevation);
      } catch (error) {
        console.error('Error fetching data:', error);
        setElevationError('Сталась помилка...');
      } finally {
        setElevationLoad(false);
      }
    };

    fetchData();
  }, [marker]);

  const handleSubmitButton = () => {
    setMarker({ lat, lng });
    DynamicMap = dynamic(() => import('@/components/Map'), {
      ssr: false,
      loading: () => <Loading>Завантаження...</Loading>,
    });
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
    navigator.clipboard.writeText(string);
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
                Ширина: <Underline>{marker.lat}</Underline>;
              </Paragraph>
              <br />
              <Paragraph>
                Довгота: <Underline>{marker.lng}</Underline>;
              </Paragraph>
            </div>
            <IconButton
              onClick={() =>
                copyToClipboard(`Ширина: ${marker.lat}; Довгота: ${marker.lng}`)
              }
              sx={{ padding: 0 }}
            >
              <ContentCopyIcon />
            </IconButton>
          </TitleWrapper>
          <Title>Висота:</Title>
          <TitleWrapper>
            <Paragraph>{ elevationError ? elevationError : isElevationLoad ?'Завантаження...' : `${elevation} м` }</Paragraph>
            <IconButton
              onClick={() => copyToClipboard(`${elevation} м`)}
              sx={{ padding: 0 }}
            >
              <ContentCopyIcon />
            </IconButton>
          </TitleWrapper>
          <Title>Ввести вручну координати:</Title>
          <TextField
            variant="standard"
            type="number"
            label="Ширина"
            value={lat}
            onChange={(e) => setLat(Number(e.target.value))}
          />
          <TextField
            variant="standard"
            type="number"
            label="Довгота"
            value={lng}
            onChange={(e) => setLng(Number(e.target.value))}
          />
          <Button variant="contained" onClick={handleSubmitButton}>
            Розрахувати
          </Button>
        </ControlWrapper>
      </PageWrapper>
    </PageContainer>
  );
};

export default ElevationPage;
