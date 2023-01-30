import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => {
    const fitRed = theme.colors['fit-red'][4];
    return (
        {
            wrapper: {
                position: 'relative',
                padding: '15px 10px',
                width: '100%',
                // height: '100vh',
                alignItems: 'start',
                justifyContent: 'start',
                // overflowY: 'scroll',


            },
            userRow: {
                display: 'flex',
            },
            greeting: {
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                width: '100%',
                color: theme.colors.gray[8],
                height: '55px',

            },
            greeting_text: {
                fontSize: '21px',
                fontWeight: '500',
                letterSpacing: '-1px',
                lineHeight: 1,
            },
            greeting_text_name: {
                fontSize: '21px',
                fontWeight: '700',
                letterSpacing: '-1px',
                lineHeight: 1,
                marginTop: '2px'
            },
            avatarContainer: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50px',
            },

            topRow: {
                display: 'flex',
                width: '100%',
                position: 'relative',
                // justifyContent: 'center',
                // alignItems: 'center',
                height: '200px'
            },
            crown: {
                fontSize: '25px',
                textAlign: 'center',
                marginBottom: '-5px'
            },
            firstPlace: {
                position: 'absolute',
                left: 'calc(50% - 40px)',
                zIndex: 999
            },
            secondPlace: {
                position: 'absolute',
                left: 'calc(50% - 100px)',
                top: '28px'
            },
            thirdPlace: {
                position: 'absolute',
                left: 'calc(50% + 30px)',
                top: '40px'
            },
            placeName: {
                textAlign: 'center',
                fontSize: '15px',
                letterSpacing: '-.5px',
            },
            placePts: {
                fontSize: '13px',
                letterSpacing: '-.5px',
                fontWeight: 600,
                textAlign: 'center',
            },
            placeNumber: {
                fontSize: '17px',
                letterSpacing: '-.5px',
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: '-3px',

            },
            userRow: {
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '45px',
                position: 'relative',
                marginBottom: '5px',
                borderBottom: '1px solid #e9ecef',
                paddingBottom: '5px',
            },
            userRowPlace: {
                fontSize: '18px',
                fontWeight: 700,
                marginRight: '10px',
                color: '#6c757d'
            },
            userRowName: {
                fontSize: '15px',
                fontWeight: 600,
                marginLeft: '10px'
            },
            userRowPts: {
                fontSize: '15px',
                fontWeight: 600,
                position: 'absolute',
                right: '10px'
            },

        }

    );


});


