import React from 'react';
import { urlFor } from '../../sanity';
import { l } from './SharedComponents';

export default function Footer({ data, settings }) {
  return (
    <footer className="bg-slate py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-bold font-heading tracking-tight text-white">
          {data?.logoTextMain || "VELVET"}<span className="text-orange">{data?.logoTextHighlight || "LOGIC"}</span>
        </div>
        <div className="flex gap-8 font-heading text-sm font-medium text-white/60 hover:[&>a]:text-white transition-colors">
          {data?.socialLinks?.length ? (
            data.socialLinks.map((link) => (
              <a key={link._key || link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
            ))
          ) : (
            <>
              <a href="#linkedin">LinkedIn</a>
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
