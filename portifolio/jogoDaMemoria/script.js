document.addEventListener('DOMContentLoaded', () => {
    const cardsGrid = document.getElementById('cards-grid');
    const restartBtn = document.getElementById('restart-btn');
    const congratsMessage = document.getElementById('congrats-message');
    const attemptsDisplay = document.getElementById('attempts');
    
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let canFlip = true;
    let attempts = 0;
    
    const cardImages = [
        'pic1.jpg',
        'pic2.jpg',
        'pic3.jpg'
    ];
    
    function initGame() {
        cardsGrid.innerHTML = '';
        hideCongratulations(); 
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        canFlip = true;
        attempts = 0;
        updateAttemptsDisplay();
        
        localStorage.setItem('memoryGameAttempts', '0');
        
        let gameCards = [];
        cardImages.forEach((image, index) => {
            gameCards.push({ id: index * 2, image });
            gameCards.push({ id: index * 2 + 1, image });
        });
        
        gameCards = shuffleArray(gameCards);
        
        gameCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id;
            cardElement.dataset.image = card.image;
            
            const imgElement = document.createElement('img');
            imgElement.src = `assets/${card.image}`;
            imgElement.alt = `Imagem ${index}`;
            cardElement.appendChild(imgElement);
            
            cardElement.addEventListener('click', flipCard);
            cardsGrid.appendChild(cardElement);
            cards.push(cardElement);
        });
  
        const savedAttempts = localStorage.getItem('memoryGameAttempts');
        if (savedAttempts) {
            attempts = parseInt(savedAttempts);
            updateAttemptsDisplay();
        }
    }
    
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    function flipCard() {
        if (!canFlip || flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
            return;
        }
        
        this.classList.add('flipped');
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            canFlip = false;
            checkForMatch();
        }
    }
    
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        attempts++;
        updateAttemptsDisplay();
        localStorage.setItem('memoryGameAttempts', attempts.toString());
        
        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            canFlip = true;
            matchedPairs++;
            
            if (matchedPairs === cardImages.length) {
                setTimeout(() => {
                    showCongratulations();
                }, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                canFlip = true;
            }, 1000);
        }
    }
    
    function updateAttemptsDisplay() {
        attemptsDisplay.textContent = attempts;
    }
    
    function showCongratulations() {
        congratsMessage.textContent = 'Parabéns, você ganhou! :)';
        congratsMessage.classList.add('visible');
    }
    
    function hideCongratulations() {
        congratsMessage.textContent = '';
        congratsMessage.classList.remove('visible');
    }
    
    restartBtn.addEventListener('click', initGame);

    initGame();
});