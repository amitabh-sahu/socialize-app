import React from 'react';
import imgHero from '../assets/imgHero.jpg';

function Background() {
    const style = {
        position: 'absolute',
        inset: 0,
        zIndex: '-1',
        backgroundColor: '#454545',
        backgroundImage: `url(${imgHero})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
    };

    return (
        <div style={style}></div>
    );
}

export default Background;