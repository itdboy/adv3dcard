import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import ReactParticles from 'react-particles-js';
import particlesConfig from './particles-config.js';
import './styles.scss';

function App() {
  return (
    <div className="main"  >
      <Particles>
        <Hero>
          <div className="container">
            <Info />
            <div className="row">
              {cards.map((card, i) => (
                <div className="column">
                  <Card>
                    <div className="card-title">{card.title}</div>
                    <div className="card-body">{card.description}</div>
                    <Image ratio={card.imageRatio} src={card.image} />
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Hero>
      </Particles>
    </div>
  );
}

function Card({ children }) {
  const ref = useRef();
  const [isHovered, setHovered] = useState(false);
  const [animatedProps, setAnimatedProps] = useSpring(() => {
    return {
      xys: [0, 0, 1],
      config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 }
    };
  });

  return (
    <animated.div
      ref={ref}
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={({ clientX, clientY }) => {
        const x = clientX - (ref.current.offsetLeft - (window.scrollX || window.pageXOffset || document.body.scrollLeft));
        const y = clientY - (ref.current.offsetTop - (window.scrollY || window.pageYOffset || document.body.scrollTop));

        const dampen = 50;
        const xys = [
          -(y - ref.current.clientHeight / 2) / dampen,
          (x - ref.current.clientWidth / 2) / dampen, 1.07
        ];

        setAnimatedProps({ xys: xys });
      }}

      onMouseLeave={() => {
        setHovered(false);
        setAnimatedProps({ xys: [0, 0, 1] });
      }}

      style={{
        zIndex: isHovered ? 2 : 1,
        transform: animatedProps.xys.interpolate((x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`)
      }}
    >{children}</animated.div>
  );
}

function Particles({ children }) {
  return (
    <div style={{ position: 'relative' }}>
      <ReactParticles
        params={particlesConfig}
        style={{
          position: 'absolute',
          zIndex: 1,
          left: 0,
          right: 0,
          bottom: 0,
          top: 0
        }}
      />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  )
}

function Hero({ children }) {
  return (
    <div className="hero">
      <div className="hero-body">{children}</div>
    </div>
  )
}


function Image({ ratio, src }) {
  return (
    <div className="image-container">
      <div className="image-inner-contrainer">
        <div className="ratio" style={{ paddingTop: ratio * 100 + '%' }}>
          <div className="ratio-inner">
            <img src={src} />
          </div>
        </div>
      </div>
    </div>
  )
}


function Info() {
  return (
    <div className="info">
      Spring cards from
      <a target="_blank" href="#">divjoy.com</a>
      <div className="notice">(best viwed at larger screen width)</div>
    </div>
  );
}

const cards = [
  {
    title: 'Build faster',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo assumenda officiis animi maiores dignissimos eos impedit? Nam, dignissimos neque quis illum provident deleniti similique sint, nihil animi natus a sed?',
    image: 'https://6jlvz1j5q3.csb.app/undraw_collection.svg',
    imageRatio: 784 / 1016
  },
  {
    title: 'Tweek anything',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo assumenda officiis animi maiores dignissimos eos impedit? Nam, dignissimos neque quis illum provident deleniti similique sint, nihil animi natus a sed?',
    image: 'https://6jlvz1j5q3.csb.app/undraw_upload.svg',
    imageRatio: 839 / 1133
  },
  {
    title: 'Export your code',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo assumenda officiis animi maiores dignissimos eos impedit? Nam, dignissimos neque quis illum provident deleniti similique sint, nihil animi natus a sed?',
    image: 'https://6jlvz1j5q3.csb.app/undraw_static_assets.svg',
    imageRatio: 730 / 1030
  }

];



export default App;
