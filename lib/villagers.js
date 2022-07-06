const villagerResolver = (villager) => {
  const { birthday, hobby, image_uri, personality, saying, species } = villager;

  return {
    birthday: birthday,
    birthdayString: villager['birthday-string'],
    color: villager['bubble-color'],
    catchPhrase: villager['catch-phrase'],
    name: villager.name['name-EUen'],
    hobby: hobby,
    image: {
      alt: `Portrait of ${villager.name['name-EUen']}`,
      url: image_uri
    },
    personality: personality,
    saying: saying,
    species: species
  }
}

export const getVillagers = async () => {
  try {
    const allVillagersData = await fetch('https://acnhapi.com/v1/villagers')
    .then(response => response.json())
    .then(data => Object.values(data)); // it's not in arrays by default
    
    const resolvedData = allVillagersData.map(villager => villagerResolver(villager));
    const todaysDateMatchingAcApi = `${new Date().getDate('en-GB', { timezone: "Europe/London" })}/${new Date().getMonth('en-GB', { timezone: "Europe/London" }) + 1}`;
    const villagerWithBirthday = resolvedData.find(villager => villager.birthday === todaysDateMatchingAcApi);
      
    return {
      max: allVillagersData.length,
      data: villagerWithBirthday ? villagerWithBirthday : resolvedData[Math.floor(Math.random() * allVillagersData.length)]
    }
  } catch (error) {
    console.log("Couldn't fetch all villagers, returning Beau!", error);
    return {
      data: {
        birthday: '5/4',
        birthdayString: 'April 5th',
        color: '#ff791f',
        catchPhrase: 'saltlick',
        name: 'Beau',
        hobby: 'Nature',
        image: {
          alt: 'Portrait of Beau',
          url: 'https://acnhapi.com/v1/images/villagers/108'
        },
        personality: 'Lazy',
        saying: 'You snooze, you lose.',
        species: 'Deer'
      }
    }
  }
}

export const getVillager = async (id) => {
  const singleVillagerData = await fetch(`https://acnhapi.com/v1/villagers/${id}`)
    .then(response => response.json())
    .then(data => data);

    const resolvedData = villagerResolver(singleVillagerData);
    return resolvedData;
}
