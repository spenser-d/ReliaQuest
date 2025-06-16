import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { type Pokemon } from 'src/hooks/useGetPokemons';

export default function PokemonListItem({ pokemon }: { pokemon: Pokemon }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div className={classes.listItem} onClick={handleClick}>
      <img src={pokemon.image} alt={pokemon.name} className={classes.image} />
      <div className={classes.content}>
        <div className={classes.name}>{pokemon.name}</div>
        <div className={classes.number}>#{pokemon.number}</div>
        <div className={classes.types}>
          {pokemon.types?.map((type, index) => (
            <span key={index} className={classes.type}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const useStyles = createUseStyles(
  {
    listItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      margin: '8px 0',
      backgroundColor: '#fff',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f5f5f5',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
    },
    image: {
      width: '80px',
      height: '80px',
      marginRight: '16px',
      borderRadius: '50%',
    },
    content: {
      flex: 1,
    },
    name: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '4px',
      textTransform: 'capitalize',
      color: '#333',
    },
    number: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px',
    },
    types: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
    },
    type: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      backgroundColor: '#e0e0e0',
      color: '#333',
    },
  },
  { name: 'PokemonListItem' }
);
