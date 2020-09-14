import React, { useEffect, useRef } from 'react';
import './LazyImage.css';

function LazyImage(props) {

    const { src, alt } = props;
    const element = useRef(null);
    let observer;

    useEffect(() => {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const { isIntersecting } = entry;
                if (isIntersecting) {
                    element.current.src = props.src;
                    observer = observer.disconnect();
                }
            })
        },
            {
                rootMargin: '0px 0px 500px 0px',
            });
        observer.observe(element.current);

        return () => { observer && observer.disconnect() };
    }, [src])

    return <img alt={alt} ref={element} />;
}

export default LazyImage;