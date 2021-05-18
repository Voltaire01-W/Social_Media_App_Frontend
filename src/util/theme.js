export const themeObject = {
    palette: {
      primary: {
        light: '#d15353',
        main: '#c62828',
        dark: '#8a1c1c',
        contrastText: '#fff'
      },
      secondary: {
        light: '#ffa533',
        main: '#ff8f00',
        dark: '#b26400',
        contrastText: '#fff'
      }
    },
    spreadThis: {
      typography: {
        useNextVariants: true
      },
      form: {
          textAlign: 'center',
      },
      image: {
          margin: '0px auto 20px auto'
      },
      pageTitle: {
          margin: '0px auto 10px auto'
      },
      textField: {
          margin: '5px auto 5px auto'
      },
      button: {
          margin: '15px auto 10px auto',
          position: 'relative'
      },
      customError: {
          color: 'red',
          fontSize: '0.8rem',
          marginTop: 10
      },
      progress: {
          position: 'absolute'
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      paper: {
        padding: 20,
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#8a1c1c'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      },
    },
  };