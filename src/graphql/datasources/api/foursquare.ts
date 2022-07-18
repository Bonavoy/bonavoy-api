import { RESTDataSource } from 'apollo-datasource-rest'
import { format } from 'date-fns'

export interface VenueRecommendationParams {
  coords: { lat: number; lng: number }
  pageSize: number
  offset: number
}

// TODO: WRITE TYPES
const dummy = {
  meta: {
    code: 200,
    requestId: '62d47907fd35083cb23d2cef',
  },
  response: {
    queryRefinements: {
      target: {
        type: 'path',
        url: '/venue/explore',
        params: {
          ll: '51.176000,-115.572000',
          radius: '10000',
        },
      },
      refinements: [
        {
          query: 'Food',
        },
        {
          query: 'Nightlife',
        },
        {
          query: 'Coffee',
        },
        {
          query: 'Shops',
        },
        {
          query: 'Arts',
        },
        {
          query: 'Outdoors',
        },
      ],
    },
    suggestedFilters: {
      header: 'Tap to show:',
      filters: [
        {
          name: 'Open now',
          key: 'openNow',
        },
      ],
    },
    suggestedRadius: 10000,
    headerLocation: 'Banff',
    headerFullLocation: 'Banff',
    headerLocationGranularity: 'city',
    totalResults: 88,
    suggestedBounds: {
      ne: {
        lat: 51.18595966244087,
        lng: -115.55296548528405,
      },
      sw: {
        lat: 51.163194274293836,
        lng: -115.57353664440417,
      },
    },
    groups: [
      {
        type: 'Recommended Places',
        name: 'recommended',
        items: [
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4d3c41911a67a0900aa00450',
              name: 'Banff National Park',
              location: {
                address: '224 Banff Ave',
                crossStreet: 'Trans-Canada Highway | Route Transcanadienne',
                lat: 51.177996,
                lng: -115.570995,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.177996,
                    lng: -115.570995,
                  },
                ],
                distance: 232,
                postalCode: 'T1L 1K2',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: [
                  '224 Banff Ave (Trans-Canada Highway | Route Transcanadienne)',
                  'Banff AB T1L 1K2',
                  'Canada',
                ],
              },
              categories: [
                {
                  id: '52e81612bcbc57f1066b7a21',
                  name: 'National Park',
                  pluralName: 'National Parks',
                  shortName: 'National Park',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/hikingtrail_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4d3c41911a67a0900aa00450-0',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '556ba935498e7c3783130ccc',
              name: 'Park Distillery + Restaurant',
              location: {
                address: '219 Banff Ave',
                lat: 51.17769500448603,
                lng: -115.57098239407523,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.17769500448603,
                    lng: -115.57098239407523,
                  },
                ],
                distance: 201,
                postalCode: 'T1L 1A7',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['219 Banff Ave', 'Banff AB T1L 1A7', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1c4941735',
                  name: 'Restaurant',
                  pluralName: 'Restaurants',
                  shortName: 'Restaurant',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-556ba935498e7c3783130ccc-1',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4f030fac775bec6b4680098c',
              name: 'Tooloulous',
              location: {
                address: '204 Caribou Street',
                crossStreet: 'btwn Banff & Bear',
                lat: 51.176641,
                lng: -115.572089,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.176641,
                    lng: -115.572089,
                  },
                ],
                distance: 71,
                postalCode: 'T1L 1A6',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['204 Caribou Street (btwn Banff & Bear)', 'Banff AB T1L 1A6', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d17a941735',
                  name: 'Cajun / Creole Restaurant',
                  pluralName: 'Cajun / Creole Restaurants',
                  shortName: 'Cajun / Creole',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/cajun_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
              venuePage: {
                id: '46597937',
              },
            },
            referralId: 'e-0-4f030fac775bec6b4680098c-2',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4bb229f5f964a5202ebf3ce3',
              name: 'The Spirit Of Christmas',
              location: {
                lat: 51.176254748739254,
                lng: -115.571229899529,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.176254748739254,
                    lng: -115.571229899529,
                  },
                ],
                distance: 60,
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['Banff AB', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d128951735',
                  name: 'Gift Shop',
                  pluralName: 'Gift Shops',
                  shortName: 'Gift Shop',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/shops/giftshop_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4bb229f5f964a5202ebf3ce3-3',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4d5744e458856dcbb432646d',
              name: 'The Bear Street Tavern',
              location: {
                address: '211 Bear St',
                lat: 51.17741141625117,
                lng: -115.57260159171689,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.17741141625117,
                    lng: -115.57260159171689,
                  },
                ],
                distance: 162,
                postalCode: 'T1L 1E4',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['211 Bear St', 'Banff AB T1L 1E4', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1ca941735',
                  name: 'Pizza Place',
                  pluralName: 'Pizza Places',
                  shortName: 'Pizza',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/pizza_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4d5744e458856dcbb432646d-4',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4c12dd51a1010f4745b64918',
              name: 'Banff Avenue Brewing Co.',
              location: {
                address: '110 Banff Ave.',
                crossStreet: 'at Buffalo St.',
                lat: 51.174863504900514,
                lng: -115.5710009873388,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.174863504900514,
                    lng: -115.5710009873388,
                  },
                ],
                distance: 144,
                postalCode: 'T1L 1A9',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['110 Banff Ave. (at Buffalo St.)', 'Banff AB T1L 1A9', 'Canada'],
              },
              categories: [
                {
                  id: '50327c8591d4c4b30a586d5d',
                  name: 'Brewery',
                  pluralName: 'Breweries',
                  shortName: 'Brewery',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/brewery_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4c12dd51a1010f4745b64918-5',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4bcf960da8b3a5933394625f',
              name: 'Bow Falls',
              location: {
                lat: 51.16573971302799,
                lng: -115.56038959712342,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.16573971302799,
                    lng: -115.56038959712342,
                  },
                ],
                distance: 1400,
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['Banff AB', 'Canada'],
              },
              categories: [
                {
                  id: '56aa371be4b08b9a8d573560',
                  name: 'Waterfall',
                  pluralName: 'Waterfalls',
                  shortName: 'Waterfall',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/default_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4bcf960da8b3a5933394625f-6',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4b89d2f5f964a520344f32e3',
              name: 'Coyotes Deli and Grill',
              location: {
                address: '206 Caribou St',
                lat: 51.176628,
                lng: -115.571919,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.176628,
                    lng: -115.571919,
                  },
                ],
                distance: 70,
                postalCode: 'T1L 1A2',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['206 Caribou St', 'Banff AB T1L 1A2', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d146941735',
                  name: 'Deli / Bodega',
                  pluralName: 'Delis / Bodegas',
                  shortName: 'Deli / Bodega',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/deli_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4b89d2f5f964a520344f32e3-7',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '582f915c5d6ec631f60f1ba9',
              name: 'Moose Hotel and Suites',
              location: {
                lat: 51.180607813930564,
                lng: -115.5696480590487,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.180607813930564,
                    lng: -115.5696480590487,
                  },
                ],
                distance: 538,
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['Banff AB', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1fa931735',
                  name: 'Hotel',
                  pluralName: 'Hotels',
                  shortName: 'Hotel',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/travel/hotel_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-582f915c5d6ec631f60f1ba9-8',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '53cd6c23498ef4d74b796e5d',
              name: 'Block Kitchen & Bar',
              location: {
                address: '201 Banff Ave',
                lat: 51.17665755565081,
                lng: -115.5712959042506,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.17665755565081,
                    lng: -115.5712959042506,
                  },
                ],
                distance: 88,
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['201 Banff Ave', 'Banff AB', 'Canada'],
              },
              categories: [
                {
                  id: '52e81612bcbc57f1066b79f1',
                  name: 'Bistro',
                  pluralName: 'Bistros',
                  shortName: 'Bistro',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-53cd6c23498ef4d74b796e5d-9',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4b5671d8f964a520a81028e3',
              name: 'The Bison Restaurant & Lounge',
              location: {
                address: '208 Bear Street',
                crossStreet: 'at Caribou Street',
                lat: 51.1774643350821,
                lng: -115.57250223226018,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.1774643350821,
                    lng: -115.57250223226018,
                  },
                ],
                distance: 166,
                postalCode: 'T1L 1E4',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['208 Bear Street (at Caribou Street)', 'Banff AB T1L 1E4', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1cc941735',
                  name: 'Steakhouse',
                  pluralName: 'Steakhouses',
                  shortName: 'Steakhouse',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/steakhouse_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4b5671d8f964a520a81028e3-10',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4b5cb70ff964a5201a4029e3',
              name: 'The Fairmont Banff Springs Hotel',
              location: {
                address: '405 Spray Ave.',
                lat: 51.164229064664156,
                lng: -115.5620836768803,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.164229064664156,
                    lng: -115.5620836768803,
                  },
                ],
                distance: 1481,
                postalCode: 'T1L 1J4',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['405 Spray Ave.', 'Banff AB T1L 1J4', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1fa931735',
                  name: 'Hotel',
                  pluralName: 'Hotels',
                  shortName: 'Hotel',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/travel/hotel_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4b5cb70ff964a5201a4029e3-11',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4d9cf38aa695721ef3e2060d',
              name: 'Tunnel Mountain Trailhead',
              location: {
                address: 'Caribou St',
                crossStreet: 'Grizzly St',
                lat: 51.177175986770514,
                lng: -115.560620107013,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.177175986770514,
                    lng: -115.560620107013,
                  },
                ],
                distance: 804,
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['Caribou St (Grizzly St)', 'Banff AB', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d159941735',
                  name: 'Trail',
                  pluralName: 'Trails',
                  shortName: 'Trail',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/hikingtrail_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4d9cf38aa695721ef3e2060d-12',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4b7f7749f964a520133030e3',
              name: "St James's Gate Irish Pub",
              location: {
                address: '207 Wolf Street',
                lat: 51.17836434727564,
                lng: -115.57171150508115,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.17836434727564,
                    lng: -115.57171150508115,
                  },
                ],
                distance: 263,
                postalCode: 'T1L 1C2',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['207 Wolf Street', 'Banff AB T1L 1C2', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d155941735',
                  name: 'Gastropub',
                  pluralName: 'Gastropubs',
                  shortName: 'Gastropub',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/gastropub_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4b7f7749f964a520133030e3-13',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4dd8a1a8d4c05d509708845a',
              name: 'Rocky Mountains',
              location: {
                lat: 51.18492487207055,
                lng: -115.55749551282393,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.18492487207055,
                    lng: -115.55749551282393,
                  },
                ],
                distance: 1418,
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['Banff AB', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1e9941735',
                  name: 'Ski Area',
                  pluralName: 'Ski Areas',
                  shortName: 'Ski Area',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/ski_snowboard_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4dd8a1a8d4c05d509708845a-14',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4ba5743bf964a520b70839e3',
              name: 'Nourish',
              location: {
                address: '211 Bear St',
                crossStreet: 'btwn Wolf & Caribou',
                lat: 51.17754279665489,
                lng: -115.57244333406034,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.17754279665489,
                    lng: -115.57244333406034,
                  },
                ],
                distance: 174,
                postalCode: 'T1L',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['211 Bear St (btwn Wolf & Caribou)', 'Banff AB T1L', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1d3941735',
                  name: 'Vegetarian / Vegan Restaurant',
                  pluralName: 'Vegetarian / Vegan Restaurants',
                  shortName: 'Vegetarian / Vegan',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/vegetarian_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4ba5743bf964a520b70839e3-15',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4b10d702f964a520297623e3',
              name: 'Wild Flour Artisan Bakery and Cafe',
              location: {
                address: '211 Bear St',
                crossStreet: 'Bison Courtyard',
                lat: 51.17720046528676,
                lng: -115.57253650265811,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.17720046528676,
                    lng: -115.57253650265811,
                  },
                ],
                distance: 138,
                postalCode: 'T1L 1B4',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['211 Bear St (Bison Courtyard)', 'Banff AB T1L 1B4', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d16a941735',
                  name: 'Bakery',
                  pluralName: 'Bakeries',
                  shortName: 'Bakery',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/bakery_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4b10d702f964a520297623e3-16',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '5fc5c78f5ba8a67d17678883',
              name: 'Three Bears Brewery and Restaurant',
              location: {
                address: '205 Bear Street',
                lat: 51.176913,
                lng: -115.57251,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.176913,
                    lng: -115.57251,
                  },
                ],
                distance: 107,
                postalCode: 'T1L 1B1',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['205 Bear Street', 'Banff AB T1L 1B1', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1c4941735',
                  name: 'Restaurant',
                  pluralName: 'Restaurants',
                  shortName: 'Restaurant',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-5fc5c78f5ba8a67d17678883-17',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4c0eb29598102d7f3014e406',
              name: 'Tunnel Mountain Summit',
              location: {
                lat: 51.17750127585161,
                lng: -115.55390053797133,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.17750127585161,
                    lng: -115.55390053797133,
                  },
                ],
                distance: 1274,
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['Banff AB', 'Canada'],
              },
              categories: [
                {
                  id: '4eb1d4d54b900d56c88a45fc',
                  name: 'Mountain',
                  pluralName: 'Mountains',
                  shortName: 'Mountain',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/mountain_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4c0eb29598102d7f3014e406-18',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4b659858f964a520bff52ae3',
              name: 'Maple Leaf Grille',
              location: {
                address: '137 Banff Ave',
                crossStreet: 'Caribou',
                lat: 51.176646499728186,
                lng: -115.5712474603189,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.176646499728186,
                    lng: -115.5712474603189,
                  },
                ],
                distance: 89,
                postalCode: 'T1L 1C8',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['137 Banff Ave (Caribou)', 'Banff AB T1L 1C8', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d121941735',
                  name: 'Lounge',
                  pluralName: 'Lounges',
                  shortName: 'Lounge',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/default_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4b659858f964a520bff52ae3-19',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4ba01608f964a520e05837e3',
              name: 'The Fudgery',
              location: {
                address: '215 Banff Ave',
                lat: 51.17752440189208,
                lng: -115.57104194447402,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.17752440189208,
                    lng: -115.57104194447402,
                  },
                ],
                distance: 182,
                postalCode: 'T1L 1A9',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['215 Banff Ave', 'Banff AB T1L 1A9', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1d0941735',
                  name: 'Dessert Shop',
                  pluralName: 'Dessert Shops',
                  shortName: 'Desserts',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/dessert_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4ba01608f964a520e05837e3-20',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4bc48650920eb7136fd31e2c',
              name: 'Fox Hotel & Suites',
              location: {
                address: '461 Banff Avenue',
                lat: 51.183441667436846,
                lng: -115.5631517727422,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.183441667436846,
                    lng: -115.5631517727422,
                  },
                ],
                distance: 1033,
                postalCode: 'T1L 1H8',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['461 Banff Avenue', 'Banff AB T1L 1H8', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1fa931735',
                  name: 'Hotel',
                  pluralName: 'Hotels',
                  shortName: 'Hotel',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/travel/hotel_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4bc48650920eb7136fd31e2c-21',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4b9ffe9bf964a520c95037e3',
              name: 'Monod Sports',
              location: {
                address: '129 Banff Avenue',
                lat: 51.17605597174909,
                lng: -115.5712055146906,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.17605597174909,
                    lng: -115.5712055146906,
                  },
                ],
                distance: 55,
                postalCode: 'T1L 1A4',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['129 Banff Avenue', 'Banff AB T1L 1A4', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d1f2941735',
                  name: 'Sporting Goods Shop',
                  pluralName: 'Sporting Goods Shops',
                  shortName: 'Sporting Goods',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/shops/sports_outdoors_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4b9ffe9bf964a520c95037e3-22',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '4e2ddd22e4cdb5a70d58cc7f',
              name: 'The Cascade of Time Garden',
              location: {
                lat: 51.170832911738806,
                lng: -115.5722698952747,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.170832911738806,
                    lng: -115.5722698952747,
                  },
                ],
                distance: 575,
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['Banff AB', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d15a941735',
                  name: 'Garden',
                  pluralName: 'Gardens',
                  shortName: 'Garden',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/garden_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-4e2ddd22e4cdb5a70d58cc7f-23',
          },
          {
            reasons: {
              count: 0,
              items: [
                {
                  summary: 'This spot is popular',
                  type: 'general',
                  reasonName: 'globalInteractionReason',
                },
              ],
            },
            venue: {
              id: '53973392498ea90b2e7050ad',
              name: 'Whitebark Cafe',
              location: {
                address: '401 Banff Avenue',
                lat: 51.181068336402795,
                lng: -115.56901749145584,
                labeledLatLngs: [
                  {
                    label: 'display',
                    lat: 51.181068336402795,
                    lng: -115.56901749145584,
                  },
                ],
                distance: 601,
                postalCode: 'T1L 1A9',
                cc: 'CA',
                city: 'Banff',
                state: 'AB',
                country: 'Canada',
                formattedAddress: ['401 Banff Avenue', 'Banff AB T1L 1A9', 'Canada'],
              },
              categories: [
                {
                  id: '4bf58dd8d48988d16d941735',
                  name: 'Café',
                  pluralName: 'Cafés',
                  shortName: 'Café',
                  icon: {
                    prefix: 'https://ss3.4sqi.net/img/categories_v2/food/cafe_',
                    suffix: '.png',
                  },
                  primary: true,
                },
              ],
              photos: {
                count: 0,
                groups: [],
              },
            },
            referralId: 'e-0-53973392498ea90b2e7050ad-24',
          },
        ],
      },
    ],
  },
}
export default class FoursquareAPI extends RESTDataSource {
  authParams: string

  constructor() {
    super()
    this.baseURL = `https://api.foursquare.com/v2`
    this.authParams = `client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${
      process.env.FOURSQUARE_CLIENT_SECRET
    }&v=${format(new Date(), 'yyyyMMdd')}`
  }

  willSendRequest(request: any) {
    request.headers.set('Authorization', process.env.FOURSQUARE_API_KEY)
  }

  returnDummy = () => {
    return dummy
  }

  getVenueRecommendations = async (venueRecommendationParams: VenueRecommendationParams) => {
    const { coords, pageSize, offset } = venueRecommendationParams
    // const { response } = await this.get(
    //   `/venues/explore?ll=${coords.lat},${coords.lng}&limit=${pageSize}&offset=${offset}&${this.authParams}`,
    // )
    const { response } = this.returnDummy()
    return this.format(response.groups[0].items)
  }

  format = (venueData: Array<any>) => {
    return venueData.map(({ venue }) => ({
      fsq_id: venue.id,
      name: venue.name,
      coords: {
        lng: venue.location.lng,
        lat: venue.location.lat,
      },
      category: venue.categories.at(0)?.shortName,
    }))
  }
}
