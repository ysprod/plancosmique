'use client';
import { DomaineList } from './DomaineList';

export function RubriquesOverviewDomaines({
  domaines,
}: {
  domaines: any[];
}) {

  return (
    <DomaineList domaines={domaines} />
  );
}