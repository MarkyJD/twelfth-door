import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function Layout() {
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div
      className={`relative min-h-screen flex transition-all duration-200 ${
        expanded ? ' md:pl-48' : ' md:pl-20'
      }`}
    >
      <aside
        className={`bg-slate-800 shadow-xl border-r-2 border-slate-700 fixed inset-y-0 left-0 transform md:translate-x-0 -translate-x-full transition-all duration-200 ease-in-out ${
          expanded ? 'w-48' : 'w-20'
        } ${open && ' w-48 translate-x-0'}`}
      >
        <Sidebar
          expanded={expanded}
          toggleExpanded={toggleExpanded}
          open={open}
          toggleOpen={toggleOpen}
        />
      </aside>
      <div className="flex-1">
        <header className="bg-slate-800 shadow-lg h-16 ">
          <Header toggleOpen={toggleOpen} />
        </header>
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
