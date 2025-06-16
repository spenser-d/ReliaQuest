import React from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';
import { PokemonList } from '../components';
import { useGetPokemons } from '../hooks/useGetPokemons';
import PokemonModal from '../components/PokemonModal/PokemonModal';

export const ListPage = () => {
  const classes = useStyles();
  const { pokemonId } = useParams();
  const { pokemons } = useGetPokemons();

  const selectedPokemon = pokemons.find(p => p.id === pokemonId);

  return (
    <div className={classes.root}>
      <PokemonList />
      {selectedPokemon && <PokemonModal pokemon={selectedPokemon} />}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);
