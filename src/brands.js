// Model examples for the brand gallery; these are not live inventory listings.
export const brandGroups = [
  { name: 'Mass market', brands: [
    { name: 'Maruti Suzuki', models: [['Swift', 'Suzuki Swift'], ['Baleno', 'Suzuki Baleno (2015)']] },
    { name: 'Hyundai', models: [['Creta', 'Hyundai Creta'], ['Verna', 'Hyundai Verna']] },
    { name: 'Tata', models: [['Nexon', 'Tata Nexon'], ['Harrier', 'Tata Harrier']] },
    { name: 'Mahindra', models: [['Thar', 'Mahindra Thar'], ['Scorpio', 'Mahindra Scorpio']] },
    { name: 'Kia', models: [['Seltos', 'Kia Seltos'], ['Sonet', 'Kia Sonet']] },
    { name: 'Toyota', models: [['Fortuner', 'Toyota Fortuner'], ['Innova', 'Toyota Innova']] },
    { name: 'Honda', models: [['City', 'Honda City'], ['Elevate', 'Honda Elevate']] },
    { name: 'MG', models: [['Hector', 'MG Hector'], ['ZS', 'MG ZS (crossover)']] },
    { name: 'Skoda', models: [['Kushaq', 'Škoda Kushaq'], ['Slavia', 'Škoda Slavia']] },
    { name: 'Volkswagen', models: [['Taigun', 'Volkswagen Taigun'], ['Virtus', 'Volkswagen Virtus']] },
    { name: 'Renault', models: [['Kiger', 'Renault Kiger'], ['Kwid', 'Renault Kwid']] },
    { name: 'Nissan', models: [['Magnite', 'Nissan Magnite'], ['X-Trail', 'Nissan X-Trail']] },
    { name: 'Citroën', models: [['C3', 'Citroën C3 (CC21)'], ['C5 Aircross', 'Citroën C5 Aircross']] },
    { name: 'Jeep', models: [['Compass', 'Jeep Compass'], ['Wrangler', 'Jeep Wrangler']] },
  ] },
  { name: 'Luxury', brands: [
    { name: 'Mercedes-Benz', models: [['C-Class', 'Mercedes-Benz C-Class'], ['GLC', 'Mercedes-Benz GLC']] },
    { name: 'BMW', models: [['3 Series', 'BMW 3 Series'], ['X5', 'BMW X5']] },
    { name: 'Audi', models: [['A4', 'Audi A4'], ['Q7', 'Audi Q7']] },
    { name: 'Volvo', models: [['XC90', 'Volvo XC90'], ['XC60', 'Volvo XC60']] },
    { name: 'Lexus', models: [['ES', 'Lexus ES'], ['RX', 'Lexus RX']] },
    { name: 'Land Rover', models: [['Defender', 'Land Rover Defender (L663)'], ['Range Rover', 'Range Rover']] },
    { name: 'Jaguar', models: [['F-Pace', 'Jaguar F-Pace'], ['F-Type', 'Jaguar F-Type']] },
    { name: 'Porsche', models: [['911', 'Porsche 911'], ['Cayenne', 'Porsche Cayenne']] },
    { name: 'MINI', models: [['Cooper', 'Mini Hatch'], ['Countryman', 'Mini Countryman']] },
  ] },
  { name: 'Electric-focused', brands: [
    { name: 'BYD', models: [['Atto 3', 'BYD Atto 3'], ['Seal', 'BYD Seal']] },
    { name: 'Tesla', models: [['Model 3', 'Tesla Model 3'], ['Model Y', 'Tesla Model Y']] },
    { name: 'VinFast', models: [['VF 6', 'VinFast VF 6'], ['VF 7', 'VinFast VF 7']] },
    { name: 'Tata EV range', models: [['Tiago EV', 'Tata Tiago EV'], ['Nexon EV', 'Tata Nexon EV']] },
    { name: 'MG EV range', models: [['MG4 EV', 'MG4 EV'], ['Cyberster', 'MG Cyberster']] },
    { name: 'Mahindra EV range', models: [['BE 6', 'Mahindra BE 6'], ['XEV 9e', 'Mahindra XEV 9e']] },
    { name: 'Hyundai EV range', models: [['Ioniq 5', 'Hyundai Ioniq 5'], ['Ioniq 6', 'Hyundai Ioniq 6']] },
  ] },
];

export const modelImageId = page => page.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
