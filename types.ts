
import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  type: 'sketch' | 'cad' | 'final';
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}
