export type ProductSnapshotId =
  | 'macWarm'
  | 'macFoam'
  | 'macObsidian'
  | 'ipadWarm'
  | 'ipadFoam'
  | 'ipadAurora'
  | 'iphoneWarm'
  | 'iphoneGraphite';

export type ProductSnapshotDevice = 'mac' | 'ipad' | 'iphone';

export interface ProductSnapshotAsset {
  id: ProductSnapshotId;
  device: ProductSnapshotDevice;
  label: string;
  src: string;
  alt: string;
}

export const appIconAsset = {
  src: '/media/icon/chrony-app-icon.png',
  alt: 'chrony app icon',
};

export const productSnapshots: Record<ProductSnapshotId, ProductSnapshotAsset> = {
  macWarm: {
    id: 'macWarm',
    device: 'mac',
    label: 'Mac app (Warm theme)',
    src: '/media/snapshots/mac-warm.png',
    alt: 'chrony on Mac with warm paper theme and top chrome controls',
  },
  macFoam: {
    id: 'macFoam',
    device: 'mac',
    label: 'Mac app (Foam theme)',
    src: '/media/snapshots/mac-foam.png',
    alt: 'chrony on Mac with foam theme and synced pad status',
  },
  macObsidian: {
    id: 'macObsidian',
    device: 'mac',
    label: 'Mac app (Obsidian theme)',
    src: '/media/snapshots/mac-obsidian.png',
    alt: 'chrony on Mac with obsidian dark theme',
  },
  ipadWarm: {
    id: 'ipadWarm',
    device: 'ipad',
    label: 'iPad app (Warm theme)',
    src: '/media/snapshots/ipad-warm.png',
    alt: 'chrony on iPad with warm theme and compact keyboard controls',
  },
  ipadFoam: {
    id: 'ipadFoam',
    device: 'ipad',
    label: 'iPad app (Foam theme)',
    src: '/media/snapshots/ipad-foam.png',
    alt: 'chrony on iPad with foam theme and synced writing view',
  },
  ipadAurora: {
    id: 'ipadAurora',
    device: 'ipad',
    label: 'iPad app (Aurora theme)',
    src: '/media/snapshots/ipad-aurora.png',
    alt: 'chrony on iPad with aurora dark theme',
  },
  iphoneWarm: {
    id: 'iphoneWarm',
    device: 'iphone',
    label: 'iPhone app (Warm theme)',
    src: '/media/snapshots/iphone-warm.png',
    alt: 'chrony on iPhone in warm theme with shared pad content',
  },
  iphoneGraphite: {
    id: 'iphoneGraphite',
    device: 'iphone',
    label: 'iPhone app (Graphite theme)',
    src: '/media/snapshots/iphone-graphite.png',
    alt: 'chrony on iPhone in graphite dark theme',
  },
};

export const productSnapshotCards: ProductSnapshotId[] = [
  'iphoneWarm',
  'ipadWarm',
  'macWarm',
  'iphoneGraphite',
  'ipadAurora',
  'macObsidian',
];
