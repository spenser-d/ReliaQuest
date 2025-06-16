import React, { useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import PokemonListItem from '../PokemonListItem/PokemonListItem';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, pokemonOptions, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemons = useMemo(() => {
    if (!searchTerm) return pokemons;

    const matchingOptions = pokemonOptions.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return pokemons.filter((pokemon) =>
      matchingOptions.some((option) => option.value === pokemon.id)
    );
  }, [pokemons, pokemonOptions, searchTerm]);

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
        />
      </div>
      {loading && <div>Loading...</div>}
      {filteredPokemons.map((pkmn) => (
        <PokemonListItem key={pkmn.id} pokemon={pkmn}></PokemonListItem>
      ))}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    searchContainer: {
      marginBottom: '24px',
      padding: 0,
      width: '100%',
    },
    searchInput: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '16px',
      color: '#333',
      border: '1px solid #ddd',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
      '&:focus': {
        borderColor: '#00008b',
      },
    },
  },
  { name: 'PokemonList' }
);
