import React, { useRef, useEffect, useState } from 'react';

const PongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [player1Y, setPlayer1Y] = useState(0);
  const [player2Y, setPlayer2Y] = useState(0);
  const [ballX, setBallX] = useState(0);
  const [ballY, setBallY] = useState(0);
  const [ballSpeedX, setBallSpeedX] = useState(2);
  const [ballSpeedY, setBallSpeedY] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const render = () => {
      if (context && canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw paddles
        context.fillStyle = 'white';
        context.fillRect(10, player1Y, 10, 100);
        context.fillRect(canvas.width - 20, player2Y, 10, 100);

        // Draw ball
        context.beginPath();
        context.arc(ballX, ballY, 10, 0, Math.PI * 2);
        context.fill();
      }
    };

    const update = () => {
      setBallX((prev) => prev + ballSpeedX);
      setBallY((prev) => prev + ballSpeedY);

      // Ball collision with top and bottom
      if (ballY <= 0 || ballY >= canvas!.height) {
        setBallSpeedY((prev) => -prev);
      }

      // Ball collision with paddles
      if (
        (ballX <= 20 && ballY >= player1Y && ballY <= player1Y + 100) ||
        (ballX >= canvas!.width - 20 && ballY >= player2Y && ballY <= player2Y + 100)
      ) {
        setBallSpeedX((prev) => -prev);
      }

      // Ball out of bounds
      if (ballX <= 0 || ballX >= canvas!.width) {
        setBallX(canvas!.width / 2);
        setBallY(canvas!.height / 2);
      }
    };

    const gameLoop = () => {
      update();
      render();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, [ballX, ballY, ballSpeedX, ballSpeedY, player1Y, player2Y]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      setPlayer2Y((prev) => Math.max(prev - 20, 0));
    } else if (e.key === 'ArrowDown') {
      setPlayer2Y((prev) => Math.min(prev + 20, canvasRef.current!.height - 100));
    } else if (e.key === 'w') {
      setPlayer1Y((prev) => Math.max(prev - 20, 0));
    } else if (e.key === 's') {
      setPlayer1Y((prev) => Math.min(prev + 20, canvasRef.current!.height - 100));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} style={{ background: 'black' }} />;
};

export default PongGame;
