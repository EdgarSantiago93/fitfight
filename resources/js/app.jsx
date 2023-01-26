

import { InertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
import { render } from 'react-dom';
import '../css/app.css';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <MantineProvider withGlobalStyles withNormalizeCSS
        theme={{
            colors: {
                // 'fit-red': ['#F04336', '#E63A2E', '#D93227', '#C92A20', '#B92119', '#A81912', '#9A110C', '#8C0905', '#7E0100', '#6F0000'],
                'fit-red': [
                    '#ffe5e2',
                    '#ffbab6',
                    '#f88f87',
                    '#f46358',
                    '#ef3729',
                    '#d61e10',
                    '#a7150b',
                    '#780e07',
                    '#4a0601',
                    '#200000',
                ],
                // 'fit-orange': ['#FBAB3E', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
                'fit-orange': [
                    '#fff3dc',
                    '#ffdeb0',
                    '#fdc981',
                    '#fbb350',
                    '#fa9d21',
                    '#e18409',
                    '#af6604',
                    '#7d4901',
                    '#4c2b00',
                    '#1d0e00',
                ],
            },

            primaryColor: 'fit-red',
            primaryShade: 4,
            defaultGradient: { from: 'blue', to: 'teal', deg: 20 }
        }}>

        <NotificationsProvider>
            <InertiaApp
                // Pass props from the server down to the client app
                initialPage={JSON.parse(container.dataset.page)}
                // Dynamically load the required page component
                resolveComponent={(name) => import(`./Pages/${name}`).then((module) => module.default)}
            />      </NotificationsProvider>


    </MantineProvider>




);