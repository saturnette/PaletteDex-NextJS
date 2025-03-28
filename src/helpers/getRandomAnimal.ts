export const getRandomAnimal = () => {
    const animalNames = [
      "León",
      "Tigre",
      "Elefante",
      "Jirafa",
      "Cebra",
      "Mono",
      "Panda",
      "Koala",
      "Canguro",
      "Delfín",
    ];
    return animalNames[Math.floor(Math.random() * animalNames.length)];
  };