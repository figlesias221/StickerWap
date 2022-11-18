import i18n from 'translations';

export const cateogryMap = (category: string) => {
  switch (category) {
    case 'Qatar':
      return {
        abreviation: 'QAT',
        color: '#FF7E62',
      };
    case 'Ecuador':
      return {
        abreviation: 'ECU',
        color: '#FFC800',
      };
    case 'Senegal':
      return {
        abreviation: 'SEN',
        color: '#05950A',
      };
    case 'Netherlands':
      return {
        abreviation: 'NED',
        color: '#FF7E00',
      };
    case 'England':
      return {
        abreviation: 'ENG',
        color: '#FFFFFF',
      };
    case 'Iran':
      return {
        abreviation: 'IRN',
        color: '#D56B03',
      };
    case 'United States':
      return {
        abreviation: 'USA',
        color: '#FF0000',
      };
    case 'Wales':
      return {
        abreviation: 'WAL',
        color: '#F9CCCC',
      };
    case 'Argentina':
      return {
        abreviation: 'ARG',
        color: '#65FFFE',
      };
    case 'Saudi Arabia':
      return {
        abreviation: 'KSA',
        color: '#025E0B',
      };
    case 'Mexico':
      return {
        abreviation: 'MEX',
        color: '#54FF00',
      };
    case 'Poland':
      return {
        abreviation: 'POL',
        color: '#54FF00',
      };
    case 'France':
      return {
        abreviation: 'FRA',
        color: '#0332F8',
      };
    case 'Australia':
      return {
        abreviation: 'AUS',
        color: '#F7FF01',
      };
    case 'Denmark':
      return {
        abreviation: 'DEN',
        color: '#E10000',
      };
    case 'Tunisia':
      return {
        abreviation: 'TUN',
        color: '#FF5C5C',
      };
    case 'Spain':
      return {
        abreviation: 'ESP',
        color: '#FF0000',
      };
    case 'Costa Rica':
      return {
        abreviation: 'CRC',
        color: '#AE1E00',
      };
    case 'Germany':
      return {
        abreviation: 'GER',
        color: '#D6D600',
      };
    case 'Japan':
      return {
        abreviation: 'JPN',
        color: '#073EFF',
      };
    case 'Belgium':
      return {
        abreviation: 'BEL',
        color: '#A53F00',
      };
    case 'Canada':
      return {
        abreviation: 'CAN',
        color: '#DA0F0F',
      };
    case 'Morocco':
      return {
        abreviation: 'MAR',
        color: '#FFFFFF',
      };
    case 'Croatia':
      return {
        abreviation: 'CRO',
        color: '#DA0F0F',
      };
    case 'Brazil':
      return {
        abreviation: 'BRA',
        color: '#FFF500',
      };
    case 'Serbia':
      return {
        abreviation: 'SRB',
        color: '#FD2232',
      };
    case 'Switzerland':
      return {
        abreviation: 'SUI',
        color: '#DD0010',
      };
    case 'Cameroon':
      return {
        abreviation: 'CMR',
        color: '#009305',
      };
    case 'Portugal':
      return {
        abreviation: 'POR',
        color: '#3FF301',
      };
    case 'Ghana':
      return {
        abreviation: 'GHA',
        color: '#FFC973',
      };
    case 'Uruguay':
      return {
        abreviation: 'URU',
        color: '#3AD6FF',
      };
    case 'South Korea':
      return {
        abreviation: 'KOR',
        color: '#FF5939',
      };
    case 'Special':
      return {
        abreviation: 'FWC',
        color: '#FFD024',
        title: i18n.t('collection.specials'),
      };
    case 'StadiumsAndBall':
      return {
        abreviation: 'FWC',
        color: '#90EE90',
        title: i18n.t('collection.stadiums'),
      };
    case 'Museum':
      return {
        abreviation: 'FWC',
        color: '#633800',
        title: i18n.t('collection.museum'),
      };
    default:
      return {
        abreviation: 'QAT',
        color: '#B1B1B1',
      };
  }
};

export const newShade = (hexColor: string, magnitude: number) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};
