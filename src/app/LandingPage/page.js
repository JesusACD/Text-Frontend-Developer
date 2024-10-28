import React from "react";
import Image from "next/image";
const recursos = ["/recurso7.png", "/recurso8.png", "/recurso7.png"];
const LandingPage = () => {
  return (
    <div>
      <div className="bg-[url('/recurso1.svg')] min-h-screen bg-[length:68%_auto] bg-no-repeat bg-right font-sans">
        <div className="container mx-auto">
          <nav className="flex justify-end p-4 space-x-6 text-spaceCadet font-bold scroll-smooth focus:scroll-auto">
            <a
              href="#content-1"
              className="hover:text-gray-900 scroll-smooth focus:scroll-auto"
            >
              Content 1
            </a>
            <a href="#content-2" className="hover:text-gray-900">
              Content 2
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Login
            </a>
          </nav>

          <section className="flex flex-col md:flex-row items-center justify-center min-h-screen">
            <div className="md:w-1/2 space-y-28 text-center md:text-left">
              <div className="mt-12">
                <h1 className="text-7-5xl leading-[1.1] text-spaceCadet font-bold mb-6">
                  Lorem ipsum Design
                </h1>
                <p className="text-blueGray text-2xl leading-relaxed w-[575px]">
                  Lorem ipsum dolor sit amet, consectetur adipi scing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
              <button className="w-44 h-20 text-[27px] font-bold uppercase px-6 py-2 mt-4 text-white bg-backgroundBlue hover:bg-blue-600">
                Login
              </button>
            </div>

            <div className="md:w-auto mt-8 md:mt-0 flex justify-center">
              <Image
                src="/recurso2.svg"
                alt="recurso2"
                className="w-[70rem]"
                width={100}
                height={100}
                layout="fixed"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/static/thumbnail.png" // Reemplaza con la URL de una miniatura pequeña
              />
            </div>
          </section>
        </div>
      </div>

      <section
        id="content-1"
        className="container mx-auto px-4 py-8 mt-40 mb-20 scroll-smooth focus:scroll-auto"
      >
        {/* Contenedor de Título y Texto */}
        <div className="flex flex-col items-start mb-11">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-spaceCadet mb-4 leading-tight">
            Content 1
          </h2>
          <p className="text-blueGray text-lg md:text-xl leading-relaxed max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Cuadrícula de imágenes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill("/recurso5.png")
            .map((img, index) => (
              <div
                key={index}
                className="overflow-hidden flex flex-col items-center p-4"
              >
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-48 object-cover mb-4"
                  width={500}
                  height={500}
                  layout="responsive"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/static/thumbnail.png" // URL de miniatura pequeña
                />
                <p className="text-blueGray text-lg leading-7">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
        </div>
      </section>

      <section
        id="content-2"
        className="bg-[url('/recurso6.png')] min-h-screen pb-20"
      >
        <div className="container mx-auto">
          <div className="flex flex-col items-end mb-11">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-spaceCadet mb-4 leading-tight mt-40">
              Content 2
            </h2>
            <p className="text-blueGray text-lg md:text-xl leading-relaxed max-w-[26rem] text-end">
              Lorem ipsum dolor sit amet, consectetur adipi scing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {recursos.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Imagen ${index + 1}`}
                className="w-full h-48 object-cover mb-4"
                width={500}
                height={500}
                layout="responsive"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/static/thumbnail.png" // URL de miniatura pequeña
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-backgroundBlue py-20"></footer>
    </div>
  );
};

export default LandingPage;
