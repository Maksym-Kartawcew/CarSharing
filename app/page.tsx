import { fetchCars } from "@/utilities";
import {
  Hero,
  SearchBar,
  CustomFilter,
  CarCard,
  ShowMore,
} from "../components/index";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 12,
    model: searchParams.model || "",
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-w" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars You might like</p>

          <div className="home__filters">
            <SearchBar />
            <div className="home__filter-container"></div>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 12) / 12}
              isNext={(searchParams.limit || 12) > allCars.length}
            />
          </section>
        ) : (
          <div className="flex mt-10 mb-10 items-center justify-center">
            <h2 className="text-black font-semibold text-[25px]">
              Opps, no cars founded ...
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
