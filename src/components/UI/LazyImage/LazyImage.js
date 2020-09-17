import React, { useEffect, useRef } from 'react';
import './LazyImage.css';

function LazyImage(props) {

    const element = useRef(null);

    useEffect(() => {
        let observer;
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const { isIntersecting } = entry;
                if (isIntersecting) {
                    props.src && (element.current.src = props.src);
                    observer = observer.disconnect();
                }
            })
        },
            {
                rootMargin: '0px 0px 500px 0px',
            });
        observer.observe(element.current);

        return () => { observer && observer.disconnect() };
    }, [props.src])

    return <img alt={props.alt} ref={element} />;
}

export default LazyImage;