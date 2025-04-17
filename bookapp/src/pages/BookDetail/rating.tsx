import React from 'react';
import styles from './rating.module.scss';

interface StepRatingProps {
  rating: number;
  onRate: (value: number) => void;
  maxSteps?: number;
}

const StepRating: React.FC<StepRatingProps> = ({ rating, onRate, maxSteps = 5 }) => {
  return (
    <div className={styles.container}>

      {Array.from({ length: maxSteps }, (_, i) => {
        const step = i + 1;
        const isFilled = rating >= step;

        return (
          <div key={step} className={styles.stepWrapper}>
            <button
              className={`${styles.step} ${isFilled ? styles.filled : styles.empty}`}
              onClick={() => onRate(step)}
            >
              {step}
            </button>
            {step <= maxSteps && (
              <div className={`${styles.connector} ${isFilled ? styles.filledConnector : styles.emptyConnector}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepRating;
