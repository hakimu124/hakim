"use client";
import React from 'react';

interface IonIconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
}

export const IonIcon = (props: IonIconProps) => {
  return React.createElement('ion-icon', props);
};
