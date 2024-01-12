// import { fetchCars } from "@/utilities";
// import {
//   Hero,
//   SearchBar,
//   CustomFilter,
//   CarCard,
//   ShowMore,
// } from "../components/index";
// import { fuels, yearsOfProduction } from "@/constants";

// export default async function Home({ searchParams }) {
//   const allCars = await fetchCars({
//     manufacturer: searchParams.manufacturer || "",
//     year: searchParams.year || 2022,
//     fuel: searchParams.fuel || "",
//     limit: searchParams.limit || 12,
//     model: searchParams.model || "",
//   });
//   const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

//   return (
//     <main className="overflow-hidden">
//       <Hero />
//       <div className="mt-12 padding-x padding-y max-w" id="discover">
//         <div className="home__text-container">
//           <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
//           <p>Explore the cars You might like</p>

//           <div className="home__filters">
//             <SearchBar />
//             <div className="home__filter-container"></div>
//             <CustomFilter title="fuel" options={fuels} />
//             <CustomFilter title="year" options={yearsOfProduction} />
//           </div>
//         </div>

//         {!isDataEmpty ? (
//           <section>
//             <div className="home__cars-wrapper">
//               {allCars?.map((car) => (
//                 <CarCard car={car} />
//               ))}
//             </div>

//             <ShowMore
//               pageNumber={(searchParams.limit || 12) / 12}
//               isNext={(searchParams.limit || 12) > allCars.length}
//             />
//           </section>
//         ) : (
//           <div className="flex mt-10 mb-10 items-center justify-center">
//             <h2 className="text-black font-semibold text-[25px]">
//               Opps, no cars founded ...
//             </h2>
//             <p>{allCars?.message}</p>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";
import { fetchCars } from "@/utilities";
import { useEffect, useState } from "react";
import {
  Hero,
  SearchBar,
  CustomFilter,
  CarCard,
  ShowMore,
} from "../components/index";
import { fuels, yearsOfProduction } from "@/constants";
import Image from "next/image";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  // filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("");
  // pagination states
  const [limit, setLimit] = useState(12);

  const getCars = async () => {
    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        fuel: fuel || "",
        limit: limit || 12,
        model: model || "",
        year: year || 2022,
      });
      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-w" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars You might like</p>

          <div className="home__filters">
            <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
            <div className="home__filter-container"></div>
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div>
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 12}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="flex mt-10 mb-10 items-center justify-center">
            <h2 className="text-black font-semibold text-[25px]">
              Opps, no cars founded ...
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}
