
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import locationsData from '../../locations.json';
import { getEnvironmentalData } from '../api/openMeteo';
import TeamRevealGrid from '../components/ui/team-reveal-grid';

function Dashboard() {
  const [dataMap, setDataMap] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      const newMap = {};

      for (const loc of locationsData.locations) {
        try {
          const data = await getEnvironmentalData(loc.lat, loc.lon);
          newMap[loc.id] = data;
        } catch (error) {
          console.error('Failed to fetch for', loc.id, error);
        }
      }

      setDataMap(newMap);
    };

    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-[#04130f] text-white">

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* Dashboard Heading */}
        <div className="mb-10">
          <p className="text-emerald-400 text-sm tracking-widest font-semibold mb-2">
            ENVIRONMENTAL MONITORING
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            EcoSense Dashboard
          </h1>

          <p className="text-gray-400">
            Monitor environmental conditions across coastal locations.
          </p>
        </div>

        {/* Environmental Location Cards */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Monitoring Locations
            </h2>

            <Link
              to="/map"
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              Explore Map →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {locationsData.locations.map((loc) => (
              <Link
                key={loc.id}
                to={`/location/${loc.id}`}
                className="block rounded-2xl border border-emerald-900/50 bg-[#0a2119] p-5 hover:border-emerald-400/70 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">

                  {loc.image ? (
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-emerald-950 rounded-xl flex items-center justify-center text-emerald-400">
                      ?
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold">
                      {loc.name}
                    </h3>

                    <p className="text-xs text-emerald-400 mt-1">
                      Environmental Station
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  {loc.description}
                </p>

                {dataMap[loc.id] ? (
                  <div className="border-t border-emerald-900/40 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Temperature</span>
                      <span className="text-emerald-300 font-semibold">
                        {dataMap[loc.id].weather.temperature}°C
                      </span>
                    </div>

                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">Wind Speed</span>
                      <span className="text-emerald-300 font-semibold">
                        {dataMap[loc.id].weather.windspeed} km/h
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                      Updated {new Date(dataMap[loc.id].fetchedAt).toLocaleTimeString()}
                    </p>
                  </div>
                ) : (
                  <div className="border-t border-emerald-900/40 pt-4 text-sm text-gray-500">
                    Loading environmental data...
                  </div>
                )}

                <div className="mt-4 text-emerald-400 text-sm font-semibold">
                  View Location Details →
                </div>

              </Link>
            ))}

          </div>
        </section>

        {/* Meet Our Team */}
        <section className="w-full py-20 mt-12 border-t border-emerald-900/40">

          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] text-emerald-400 font-semibold mb-4">
              THE PEOPLE BEHIND ECOSENSE
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mb-5">
              Meet Our Team
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Meet the people working together to build a cleaner,
              greener and more sustainable future.
            </p>
          </div>

          <TeamRevealGrid />

        </section>

      </main>

      {/* EcoSense Footer */}
      <footer className="w-full bg-[#071b16] border-t border-emerald-900/50">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🌿</span>

                <h2 className="text-2xl font-bold text-emerald-400">
                  ECO-SENSE
                </h2>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Monitoring our environment, understanding our planet,
                and building a greener tomorrow through technology.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-5">
                QUICK LINKS
              </h3>

              <div className="flex flex-col gap-3 text-gray-400 text-sm">
                <Link to="/" className="hover:text-emerald-400 transition">
                  Dashboard
                </Link>

                <Link to="/map" className="hover:text-emerald-400 transition">
                  Explore Map
                </Link>
              </div>
            </div>

            {/* Mission */}
            <div>
              <h3 className="text-white font-semibold mb-5">
                OUR MISSION
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                Making environmental information accessible and
                encouraging informed action for a sustainable future.
              </p>
            </div>

          </div>

          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-emerald-900/50 text-center">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} ECO-SENSE. All rights reserved.
            </p>

            <p className="text-gray-600 text-xs mt-2">
              Environmental Intelligence for a Sustainable Future
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default Dashboard;
