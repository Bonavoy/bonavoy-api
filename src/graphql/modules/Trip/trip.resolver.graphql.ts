//types
import { TokenDecoded } from '../../../types/auth';

// TODO: WRITE TYPES

const dummySpots = [
  {
    fsq_id: '4d3c41911a67a0900aa00450',
    name: 'Banff National Park',
    distance: 442,
    coords: {
      lat: 51.177945,
      lng: -115.570187,
    },
  },
  {
    fsq_id: '53973392498ea90b2e7050ad',
    name: 'Whitebark Cafe',
    distance: 250,
    coords: {
      lat: 51.181101,
      lng: -115.569087,
    },
  },
  {
    fsq_id: '4f030fac775bec6b4680098c',
    name: 'Tooloulous',
    distance: 595,
    coords: {
      lat: 51.176748,
      lng: -115.572021,
    },
  },
  {
    fsq_id: '4d5744e458856dcbb432646d',
    name: 'The Bear Street Tavern',
    distance: 571,
    coords: {
      lat: 51.177259,
      lng: -115.572571,
    },
  },
  {
    fsq_id: '4d9cf38aa695721ef3e2060d',
    name: 'Tunnel Mountain Trailhead',
    distance: 488,
    coords: {
      lat: 51.173377,
      lng: -115.561248,
    },
  },
  {
    fsq_id: '4bb229f5f964a5202ebf3ce3',
    name: 'The Spirit of Christmas',
    distance: 583,
    coords: {
      lat: 51.176307,
      lng: -115.571318,
    },
  },
  {
    fsq_id: '4b5671d8f964a520a81028e3',
    name: 'The Bison Restaurant & Lounge',
    distance: 562,
    coords: {
      lat: 51.177447,
      lng: -115.572617,
    },
  },
  {
    fsq_id: '4dd8a1a8d4c05d509708845a',
    name: 'Rocky Mountains',
    distance: 776,
    coords: {
      lat: 51.184743,
      lng: -115.557303,
    },
  },
  {
    fsq_id: '4b10d702f964a520297623e3',
    name: "Wild Flour Banff's Artisan Bakery Cafe",
    distance: 581,
    coords: {
      lat: 51.177161,
      lng: -115.572632,
    },
  },
  {
    fsq_id: '4bb226bbf964a520ccbd3ce3',
    name: 'Roots',
    distance: 443,
    coords: {
      lat: 51.178127,
      lng: -115.570997,
    },
  },
  {
    fsq_id: '4b9ffe9bf964a520c95037e3',
    name: 'Monod Sports Ltd',
    distance: 599,
    coords: {
      lat: 51.176022,
      lng: -115.571333,
    },
  },
  {
    fsq_id: '4c0eb29598102d7f3014e406',
    name: 'Tunnel Mountain Summit',
    distance: 875,
    coords: {
      lat: 51.177539,
      lng: -115.553759,
    },
  },
  {
    fsq_id: '4d33ad7798336dcbeb8a30f0',
    name: 'Masala Authentic Indian Cuisine',
    distance: 522,
    coords: {
      lat: 51.178339,
      lng: -115.572494,
    },
  },
  {
    fsq_id: '57a5577fcd1007d1972237d5',
    name: "Chuck's Steakhouse",
    distance: 737,
    coords: {
      lat: 51.174504,
      lng: -115.571302,
    },
  },
  {
    fsq_id: '4c3f51253735be9a163515a4',
    name: "Nester's Market",
    distance: 689,
    coords: {
      lat: 51.175812,
      lng: -115.572387,
    },
  },
  {
    fsq_id: '4cfa995a2d80a143c2d945d8',
    name: 'Tim Hortons',
    distance: 709,
    coords: {
      lat: 51.180034,
      lng: -115.576055,
    },
  },
];

export default {
  Query: {
    spotOfInterest: async (
      _: unknown,
      { input }: any,
      {
        ctx,
        req,
        res,
        dataSources,
      }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: any }
    ) => {
      //WRITE TYPES

      // const { input } = args;
      // const options = {
      //   coords: input.coords,
      //   limit: input.limit,
      // };
      // const res = await dataSources.foursquareAPI.getSpotsOfInterest(options);
      // return res;

      return dummySpots;
    },
  },
  Mutation: {
    createTrip: async (
      _: unknown,
      { trip }: any,
      {
        ctx,
        req,
        res,
        dataSources,
      }: { ctx: TokenDecoded; req: Request; res: Response; dataSources: any }
    ) => {
      //write TYPES

      return dataSources.trips.createTrip(trip);
    },
    addSpotOfInterest: (_: unknown, args: any) => {
      //write TYPES
    },
  },
};
