export const cateogryMap = (category: string) => {
  switch (category) {
    case 'Qatar':
      return {
        abreviation: 'QAT',
        color: '#003366',
      };
    case 'Ecuador':
      return {
        abreviation: 'ECU',
        color: '#009B3A',
      };
    case 'Senegal':
      return {
        abreviation: 'SEN',
        color: '#D21034',
      };
    case 'Netherlands':
      return {
        abreviation: 'NED',
        color: '#FDBB30',
      };
    case 'England':
      return {
        abreviation: 'ENG',
        color: '#FFFFFF',
      };
    case 'Iran':
      return {
        abreviation: 'IRN',
        color: '#FF0000',
      };
    case 'United States':
      return {
        abreviation: 'USA',
        color: '#FF0000',
      };
    case 'Wales':
      return {
        abreviation: 'WAL',
        color: '#FFFFFF',
      };
    case 'Argentina':
      return {
        abreviation: 'ARG',
        color: '#FFFFFF',
      };
    case 'Saudi Arabia':
      return {
        abreviation: 'KSA',
        color: '#FFFFFF',
      };
    case 'Mexico':
      return {
        abreviation: 'MEX',
        color: '#FFFFFF',
      };
    case 'Poland':
      return {
        abreviation: 'POL',
        color: '#FFFFFF',
      };
    case 'France':
      return {
        abreviation: 'FRA',
        color: '#FFFFFF',
      };
    case 'Australia':
      return {
        abreviation: 'AUS',
        color: '#FFFFFF',
      };
    case 'Denmark':
      return {
        abreviation: 'DEN',
        color: '#FFFFFF',
      };
    case 'Tunisia':
      return {
        abreviation: 'TUN',
        color: '#FFFFFF',
      };
    case 'Spain':
      return {
        abreviation: 'ESP',
        color: '#FFFFFF',
      };
    case 'Costa Rica':
      return {
        abreviation: 'CRC',
        color: '#FFFFFF',
      };
    case 'Germany':
      return {
        abreviation: 'GER',
        color: '#FFFFFF',
      };
    case 'Japan':
      return {
        abreviation: 'JPN',
        color: '#FFFFFF',
      };
    case 'Belgium':
      return {
        abreviation: 'BEL',
        color: '#FFFFFF',
      };
    case 'Canada':
      return {
        abreviation: 'CAN',
        color: '#FFFFFF',
      };
    case 'Morocco':
      return {
        abreviation: 'MAR',
        color: '#FFFFFF',
      };
    case 'Croatia':
      return {
        abreviation: 'CRO',
        color: '#FFFFFF',
      };
    case 'Brazil':
      return {
        abreviation: 'BRA',
        color: '#FFFFFF',
      };
    case 'Serbia':
      return {
        abreviation: 'SRB',
        color: '#FFFFFF',
      };
    case 'Switzerland':
      return {
        abreviation: 'SUI',
        color: '#FFFFFF',
      };
    case 'Cameroon':
      return {
        abreviation: 'CMR',
        color: '#FFFFFF',
      };
    case 'Portugal':
      return {
        abreviation: 'POR',
        color: '#FFFFFF',
      };
    case 'Ghana':
      return {
        abreviation: 'GHA',
        color: '#FFFFFF',
      };
    case 'Uruguay':
      return {
        abreviation: 'URU',
        color: '#FFFFFF',
      };
    case 'South Korea':
      return {
        abreviation: 'KOR',
        color: '#FFFFFF',
      };
    case 'FWC':
      return {
        abreviation: 'FWC',
        color: '#FFFFFF',
      };
    case 'STADIUM':
      return {
        abreviation: 'STADIUM',
        color: '#FFFFFF',
      };
    case 'MUSEUM':
      return {
        abreviation: 'STA',
        color: '#FFFFFF',
      };
    default:
      return {
        abreviation: 'QAT',
        color: '#003366',
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
