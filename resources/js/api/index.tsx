// import { showErrorNotificationWithColor } from "@/helpers";
import axios from 'axios'

import { showNotification } from '@mantine/notifications'
import { ExclamationMark } from 'tabler-icons-react'
import React from 'react'

export const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'content-type': 'application/json',
  },
})

instance.interceptors.request.use(
  (request) => {
    return request
  },
  async (error) => {
    console.log('error', error)
  }
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    console.log('Error')
    if (err.response) {
      if (err.response.status === 419 || err.response.status === 401) {
        showNotification({
          title: 'Sesión vencida',
          message: 'Por favor reinicia sesión',
        })
        // showErrorNotification({ title: "Sesión vencida", message: "Por favor reinicia sesión", color: 'orange' });
        setTimeout(() => {
          window.location.reload()
        }, 3000)
        return { success: false }
      }
      if (err.response.status === 400) {
        let msg = err.response.data || ''
        showNotification({
          title: 'Error de datos',
          message: msg,
        })
        // showErrorNotification({ title: "Duplicado", message: "Ya existe un registro con estos datos", color: 'orange' });
        return { success: false }
      }
      if (err.response.status === 409) {
        let msg = err.response.data || ''

        showNotification({
          disallowClose: false,
          autoClose: 50000,
          title: 'Uh oh!',
          message: msg,
          color: 'white',
          icon: <ExclamationMark color="white" />,
          loading: false,
          styles: (theme) => ({
            root: {
              // 'backgroundColor': '#FBAB3E',
              'borderColor': '#FBAB3E',
              '&::before': { backgroundColor: theme.white },
            },

            // title: { color: theme.white, fontWeight: 'bold', fontSize: '17px' },
            // description: { color: theme.white, fontSize: '17px' },
            closeButton: {
              // 'color': theme.white,
              // '&:hover': { backgroundColor: theme.colors[theme.colors.lime[7]] },
            },
          }),
        })

        // showErrorNotification({ title: "Duplicado", message: "Ya existe un registro con estos datos", color: 'orange' });
        return { success: false }
      }
      if (err.response.status === 422) {
        let msg = err.response.data || ''
        showNotification({
          title: 'Error de datos',
          message: msg,
        })
        // showErrorNotification({ title: "Error de datos", message: msg, color: 'orange' });
        return { success: false }
      }
      if (err.response.status === 403) {
        let msg = err.response.data || ''
        showNotification({
          title: 'Error de autorización',
          message: msg,
        })
        // showErrorNotification({ title: "Error de autorización", message: msg, color: 'orange' });
        return { success: false }
      }
      if (err.response.status === 404) {
        showNotification({
          title: 'Oh oh',
          message: 'No se encontró el recurso solicitado',
        })
        // showErrorNotification({ title: "Oh oh", message: "No se encontró el recurso solicitado" });
        return { success: false }
      }

      if (err.response.data.errors) {
        console.log('Error')
        let errors = err.response.data.errors
        Object.keys(errors).map(function (key, _index) {
          let joined = errors[key].join(', ')
          return showNotification({
            title: 'Aviso',
            message: joined,
          })
          // return showErrorNotification({ title: "Aviso", message: joined, color: 'orange' });
        })
        return { success: false }
      }
      // return { success: false };
    }

    // showErrorNotification({ title: "Error", message: "Ocurrió un error", color: 'red' });
    showNotification({
      title: 'Error',
      message: 'Ocurrió un error',
    })
    return { success: false }
  }
)
