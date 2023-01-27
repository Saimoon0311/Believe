import {
  achieveFade,
  affirmation,
  courses,
  eBooks,
  goalFade,
  hypnosis,
  meditation,
  not1,
  not2,
  not3,
  not4,
  not5,
  OnBoard1,
  OnBoard2,
  OnBoard3,
  PositiveVibe,
  PersonalGrowth,
  Motivation,
  MentalFocus,
  Attraction,
  InnerPeace,
  Health,
  Happiness,
  Emotional,
  Deep,
  Career,
  BoastEnergy,
  refer1,
  refer2,
  refer3,
  refer4,
  script,
  series,
  sleep,
  sound1,
  sound2,
  sound3,
  sound4,
  sound5,
  sound6,
  videos,
  background,
} from '@/Assets/Images';

const appIntroData = [
  {
    id: 1,
    title: 'DREAM',
    description:
      'Use the Power of your Subconscious Mind to Inspire You to Become Your Best Self.',
    image: OnBoard1,
  },
  {
    id: 2,
    title: 'BELIEVE',
    description:
      'Create a Focused, Confident, Positive Mindset to Manifest Success in Your Goals.',
    image: OnBoard2,
  },
  {
    id: 3,
    title: 'ACHIEVE',
    description:
      'Enjoy a Hypnotic Deep Relaxation. Experience the Transformation of Your Inner Reality.',
    image: OnBoard3,
  },
];

const onboardingData = [
  {
    id: 1,
    title: 'DREAM',
    description: `Use the Power of Your Subconscious Mind to Become Your Best Self.`,
    image: background,
    data: [
      {image: PositiveVibe, name: 'Positive Vibrations'},
      {image: PersonalGrowth, name: 'Personal Growth'},
      {image: Motivation, name: 'Motivation'},
      {image: MentalFocus, name: 'Mental Focus'},
    ],
  },
  {
    id: 2,
    title: 'BELIEVE',
    description: `Create a Confident, Positive Mindset to Manifest Success in Your Goals`,
    image: background,
    data: [
      {image: Attraction, name: 'Law of Attaction'},
      {image: InnerPeace, name: 'Inner Peace'},
      {image: Health, name: 'Health and Healing'},
      {image: Happiness, name: 'Happiness'},
    ],
  },
  {
    id: 3,
    title: 'ACHIEVE',
    description: 'Enjoy a Hypnotic Deep Relaxation to Transform Your Reality',
    image: background,
    data: [
      {image: Emotional, name: 'Emotional Well-Being'},
      {image: Deep, name: 'Deep Sleep'},
      {image: Career, name: 'Career/ Business Success'},
      {image: BoastEnergy, name: 'Boost Energy'},
    ],
  },
];

const boxData = [
  {
    id: 1,
    image: achieveFade,
    time: '',
    button: 'View',
    heading: '5/10',
    name: 'Recent \nAchievements',
  },
  {
    id: 2,
    image: goalFade,
    time: '',
    button: 'Start',
    heading: 'What Would You Like to Achieve?',
    name: 'How would you like to feel today?',
  },
];

const barCard = {
  id: 1,
  time: '',
  title: 'MEDITATION',
  name: 'Meditation Timer',
};

const upgradeCard = [
  {
    id: 1,
    title: 'On Annual Subscription',
    name: 'Save 30%',
    button: 'UPGRADE',
  },
];

const libraryFilterModalData = [
  {
    id: 1,
    time: '1-5 Minutes',
    min: 0,
    max: 300,
  },
  {
    id: 2,
    time: '5-10 Minutes',
    min: 301,
    max: 600,
  },
  {
    id: 3,
    time: '10-15 Minutes',
    min: 601,
    max: 900,
  },
  {
    id: 4,
    time: '15-20 Minutes',
    min: 901,
    max: 1200,
  },
  {
    id: 5,
    time: '20-25 Minutes',
    min: 1201,
    max: 1500,
  },
  {
    id: 6,
    time: '25+ Minutes',
    min: 1501,
    max: '',
  },
  {
    id: 7,
    time: 'All',
    min: '',
    max: '',
  },
];
const downloadData = [
  {
    id: 1,
    heading: 'Happiness Frequency',
    author: 'Roara Guess',
    time: '17m',
    image: sound1,
  },
  {
    id: 2,
    heading: 'Happiness Frequency',
    author: 'Roara Guess',
    time: '17m',
    image: sound2,
  },
  {
    id: 3,
    heading: 'Happiness Frequency',
    author: 'Roara Guess',
    time: '17m',
    image: sleep,
  },
  {
    id: 4,
    heading: 'Happiness Frequency',
    author: 'Roara Guess',
    time: '17m',
    image: sound3,
  },
  {
    id: 5,
    heading: 'Happiness Frequency',
    author: 'Roara Guess',
    time: '17m',
    image: sound4,
  },
  {
    id: 6,
    heading: 'Happiness Frequency',
    author: 'Roara Guess',
    time: '17m',
    image: sound5,
  },
  {
    id: 7,
    heading: 'Happiness Frequency',
    author: 'Roara Guess',
    time: '17m',
    image: sound6,
  },
];

const notificationsData = [
  {
    id: 1,
    title: 'Happiness Frequency',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.',
    time: '1m ago.',
    image: not1,
  },
  {
    id: 2,
    title: 'Voice of Zeplin',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit consectetur adipiscing elit.',
    time: '1m ago.',
    image: not2,
  },
  {
    id: 3,
    title: 'Believe App Update',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing eli dolor sit amet, consectetur adipi.',
    time: '1m ago.',
    image: not3,
  },
  {
    id: 4,
    title: 'SALE IS LIVE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit adipiscing adipiscing.',
    time: '10 Hrs ago.',
    image: not4,
  },
  {
    id: 5,
    title: 'Amet dolor SO Launch New Track',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consect etur adi.',
    time: '15 Hrs ago.',
    image: not5,
  },
];

const walletData = [
  {
    id: 1,
    discount: '40% 0ff',
    store: 'Amet Store',
    cost: 200,
    expiry: '30 July',
  },
  {
    id: 2,
    discount: '20% 0ff',
    store: 'Subscription',
    cost: 174,
    expiry: '14 July',
  },
  {
    id: 3,
    discount: '5% 0ff',
    store: 'Next Recharge',
    cost: 50,
    expiry: '23 August',
  },
  {
    id: 4,
    discount: '30% 0ff',
    store: 'Giga Store',
    cost: 120,
    expiry: '14 July',
  },
  {
    id: 5,
    discount: '40% 0ff',
    store: 'Amet Store',
    cost: 200,
    expiry: '14 July',
  },
];

const referData = [
  {
    id: 1,
    title: 'Daniella Berrrato',
    status: 'Completed',
    completed: true,
    image: refer1,
  },
  {
    id: 2,
    title: 'Jonathan Lee',
    status: 'Pending',
    completed: false,
    image: refer2,
  },
  {
    id: 3,
    title: 'Bravo Arnold',
    status: 'Completed',
    completed: true,
    image: refer3,
  },
  {
    id: 4,
    title: 'Ponka Pop',
    status: 'Pending',
    completed: false,
    image: refer4,
  },
];

const contentTypeData = [
  {
    id: 1,
    name: 'Law of Attraction',
    selected: true,
  },
  {
    id: 2,
    name: 'Manifestation',
    selected: false,
  },
  {
    id: 3,
    name: 'Learn Hypnosis',
    selected: false,
  },
];

// const contentDataList = [
//   {
//     id: 1,
//     name: 'Hypnosis',
//     type: 'audio',
//     page: false,
//     request: 'all-hypno-cat',
//     image: hypnosis,
//     page_url: 'LibraryDetails',
//   },
//   {
//     id: 2,
//     name: 'Meditation',
//     type: 'audio',
//     page: false,
//     request: 'all-meditation-cat',
//     image: meditation,
//     page_url: 'LibraryDetails',
//   },
//   {
//     id: 3,
//     name: 'Affirmations',
//     type: 'audio',
//     page: false,
//     request: 'all-affirmation-cat',
//     image: affirmation,
//     page_url: 'LibraryDetails',
//   },
//   {
//     id: 4,
//     name: 'Courses',
//     type: 'courses',
//     page: true,
//     request: 'Courses',
//     image: courses,
//     page_url: '',
//     // page_url: 'LibraryDetails',
//   },
//   {
//     id: 5,
//     name: 'Series',
//     type: 'series',
//     page: true,
//     request: 'Series',
//     // request: 'all-series',
//     image: series,
//     page_url: '',
//     // page_url: 'VideoDetails',
//   },
//   {
//     id: 6,
//     name: 'Scripts',
//     type: 'script',
//     page: false,
//     // request: 'Scripts',
//     request: 'all-scripts',
//     image: script,
//     // page_url: '',
//     page_url: 'ScriptDetails',
//   },
//   {
//     id: 7,
//     name: 'Videos',
//     type: 'videos',
//     page: false,
//     request: 'all-video-cat',
//     image: videos,
//     page_url: 'VideoDetails',
//   },
//   {
//     id: 8,
//     name: 'EBooks',
//     type: 'eBooks',
//     page: true,
//     request: 'EBooks',
//     image: eBooks,
//     page_url: '',
//   },
// ];

const contentDataList = [
  {
    id: 1,
    name: 'Hypnosis',
    type: 'audio',
    image: hypnosis,
    page_url: 'LibraryDetails',
  },
  {
    id: 2,
    name: 'Meditation',
    type: 'audio',
    image: meditation,
    page_url: 'LibraryDetails',
  },
  {
    id: 3,
    name: 'Affirmations',
    type: 'audio',
    image: affirmation,
    page_url: 'LibraryDetails',
  },
  {
    id: 4,
    name: 'Courses',
    type: 'courses',
    request: 'Courses',
    image: courses,
    page_url: '',
  },
  {
    id: 5,
    name: 'Series',
    type: 'series',
    request: 'Series',
    image: series,
    page_url: '',
  },
  {
    id: 6,
    name: 'Scripts',
    type: 'script',
    request: 'all-scripts',
    image: script,
    page_url: 'ScriptDetails',
  },
  {
    id: 7,
    name: 'Videos',
    type: 'videos',
    image: videos,
    page_url: 'VideoDetails',
  },
  {
    id: 8,
    name: 'EBooks',
    type: 'eBooks',
    image: eBooks,
    page_url: '',
  },
];

const bellsData = [
  {
    id: 1,
    title: 'Gong',
    artist: 'Victoria Gallagher',
    url: require('../../Assets/Sounds/track_one.m4a'),
    artwork:
      'https://vrc-bucket.s3.us-east-2.amazonaws.com/library/images/bp7dAn0ckYXVWiFkJgLoJ0HpJxMQNpeVBr9ktb90.png',
  },
  {
    id: 2,
    title: 'Flute',
    artist: 'Victoria Gallagher',
    url: require('../../Assets/Sounds/track_two.m4a'),
    artwork:
      'https://vrc-bucket.s3.us-east-2.amazonaws.com/meditation-category/images/HU06NBOiwe9CSdLq5QaebZlv5TFvShhwVBTfDNSf.jpg',
  },
  {
    id: 3,
    title: 'Bell',
    artist: 'Victoria Gallagher',
    url: require('../../Assets/Sounds/track_three.m4a'),
    artwork:
      'https://vrc-bucket.s3.us-east-2.amazonaws.com/meditation-category/images/ReuU4OoblkzBTLmpzXAyN2aDiCVj3TjZFgAlX3cb.jpg',
  },
  {
    id: 4,
    title: 'Warm',
    artist: 'Victoria Gallagher',
    url: require('../../Assets/Sounds/track_four.m4a'),
    artwork:
      'https://vrc-bucket.s3.us-east-2.amazonaws.com/meditation/images/Fv4YefSHXSqzyLS8JCUWIzHOL4Gb5suGYo6VPYQl.jpg',
  },
  {
    id: 5,
    title: 'Bowl',
    artist: 'Victoria Gallagher',
    url: require('../../Assets/Sounds/track_five.m4a'),
    artwork:
      'https://vrc-bucket.s3.us-east-2.amazonaws.com/affirmation-category/images/5C5L9TeLygvog9WaweJZ3XNilZQLv82Mtvq4dV2W.jpg',
  },
  {
    id: 6,
    title: 'Spiral',
    artist: 'Victoria Gallagher',
    url: require('../../Assets/Sounds/track_six.m4a'),
    artwork:
      'https://vrc-bucket.s3.us-east-2.amazonaws.com/meditation-category/images/tMxDKkuLtd3bKmlyIPvTEJCQqZIpaooNXAKQ9vGE.png',
  },
  {
    id: 7,
    title: 'Relief',
    artist: 'Victoria Gallagher',
    url: require('../../Assets/Sounds/track_seven.m4a'),
    artwork:
      'https://vrc-bucket.s3.us-east-2.amazonaws.com/affirmation-category/images/Fp9QnOnuviBEgINOhArfQVAKn6Vhu4KXrxDclkrS.jpg',
  },
  {
    id: 8,
    title: 'Farm',
    artist: 'Victoria Gallagher',
    url: require('../../Assets/Sounds/track_eight.m4a'),
    artwork:
      'https://vrc-bucket.s3.us-east-2.amazonaws.com/affirmation-category/images/Fp9QnOnuviBEgINOhArfQVAKn6Vhu4KXrxDclkrS.jpg',
  },
  {
    id: 9,
    title: 'Rising',
    artist: 'Victoria Gallagher',
    url: require('../../Assets/Sounds/track_ten.m4a'),
    artwork:
      'https://vrc-bucket.s3.us-east-2.amazonaws.com/affirmation-category/images/Fp9QnOnuviBEgINOhArfQVAKn6Vhu4KXrxDclkrS.jpg',
  },
  {
    id: 10,
    title: 'Stress',
    artist: 'Victoria Gallagher',
    url: require('../../Assets/Sounds/track_11.m4a'),
    artwork:
      'https://vrc-bucket.s3.us-east-2.amazonaws.com/affirmation-category/images/Fp9QnOnuviBEgINOhArfQVAKn6Vhu4KXrxDclkrS.jpg',
  },
];

export {
  appIntroData,
  onboardingData,
  boxData,
  barCard,
  upgradeCard,
  libraryFilterModalData,
  downloadData,
  notificationsData,
  walletData,
  referData,
  contentTypeData,
  contentDataList,
  bellsData,
};
