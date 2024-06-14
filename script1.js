function showOptions(cardId) {
  const card = document.getElementById(cardId);
  const content = card.querySelector('.exercise-content');
  const overlay = card.querySelector('.exercise-overlay');
  content.classList.add('hidden');
  overlay.classList.remove('hidden');
}

function showTimeOptions(cardId) {
  const card = document.getElementById(cardId);
  card.querySelector('.time-options').classList.remove('hidden');
  card.querySelector('.repetition-options').classList.add('hidden');
}

function showRepetitionOptions(cardId) {
  const card = document.getElementById(cardId);
  card.querySelector('.repetition-options').classList.remove('hidden');
  card.querySelector('.time-options').classList.add('hidden');
}

function startExercise(cardId) {
  const card = document.getElementById(cardId);

  // Get the time inputs
  const minutes = card.querySelector('.minutes-input').value;
  const seconds = card.querySelector('.seconds-input').value;

  // Get the repetition inputs
  const sets = card.querySelector('.sets-input').value;
  const reps = card.querySelector('.reps-input').value;

  // Calculate the total time in seconds
  const totalSeconds = (parseInt(minutes) * 60) + parseInt(seconds);

  // Store the information
  const exerciseData = {
      time: totalSeconds,
      sets: parseInt(sets),
      reps: parseInt(reps)
  };

  console.log(`Card ID: ${cardId}, Time: ${exerciseData.time} seconds, Sets: ${exerciseData.sets}, Reps: ${exerciseData.reps}`);

  // Determine the URL to open based on the card ID
  let url;
  switch(cardId) {
      case 'card1':
          url = 'squatdetect.html';
          break;
      case 'card2':
          url = 'jump_jacksdetect.html';
          break;
      case 'card3':
          url = 'push_upsdetect.html';
          break;
      case 'card4':
          url = 'lungesdetect.html';
          break;
      default:
          return; // Exit the function if cardId doesn't match any known cards
  }

  // Open the new page with the exercise data
  const newTab = window.open(url, '_blank');
  newTab.onload = function() {
      newTab.location.reload(); // Refresh the page
      newTab.postMessage(exerciseData, '*');
  };

  // Hide the overlay and show the exercise content again
  const content = card.querySelector('.exercise-content');
  const overlay = card.querySelector('.exercise-overlay');
  content.classList.remove('hidden');
  overlay.classList.add('hidden');
}

// Attach the event listener to the Start button
document.querySelectorAll('.exercise-card').forEach(card => {
  card.querySelector('.btn-primary').addEventListener('click', () => startExercise(card.id));
});
