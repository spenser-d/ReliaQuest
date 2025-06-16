import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { type Pokemon, useGetPokemon } from 'src/hooks/useGetPokemons';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface PokemonModalProps {
  pokemon: Pokemon;
}

export default function PokemonModal({ pokemon }: PokemonModalProps) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pokemonId } = useParams();
  const { pokemon: pokemonDetails, loading } = useGetPokemon(
    pokemonId || '',
    pokemon.name || ''
  );

  const handleClose = () => {
    navigate('/pokemon');
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className={classes.dialogTitle}>
        {pokemon.name}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon className={classes.dialogButton} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={classes.image}
          />
          <div className={classes.details}>
            <div className={classes.number}>#{pokemon.number}</div>
            <div className={classes.types}>
              {pokemon.types?.map((type, index) => (
                <span key={index} className={classes.type}>
                  {type}
                </span>
              ))}
            </div>
            {loading ? (
              <div className={classes.loading}>Loading details...</div>
            ) : pokemonDetails ? (
              <div className={classes.detailedInfo}>
                <div className={classes.infoRow}>
                  <span className={classes.infoLabel}>Classification:</span>
                  <span className={classes.infoValue}>
                    {pokemonDetails.classification}
                  </span>
                </div>
                <div className={classes.infoRow}>
                  <span className={classes.infoLabel}>Height:</span>
                  <span className={classes.infoValue}>
                    {pokemonDetails.height.minimum} -{' '}
                    {pokemonDetails.height.maximum}
                  </span>
                </div>
                <div className={classes.infoRow}>
                  <span className={classes.infoLabel}>Weight:</span>
                  <span className={classes.infoValue}>
                    {pokemonDetails.weight.minimum} -{' '}
                    {pokemonDetails.weight.maximum}
                  </span>
                </div>
                <div className={classes.infoRow}>
                  <span className={classes.infoLabel}>Max CP:</span>
                  <span className={classes.infoValue}>
                    {pokemonDetails.maxCP}
                  </span>
                </div>
                <div className={classes.infoRow}>
                  <span className={classes.infoLabel}>Max HP:</span>
                  <span className={classes.infoValue}>
                    {pokemonDetails.maxHP}
                  </span>
                </div>
                <div className={classes.infoRow}>
                  <span className={classes.infoLabel}>Flee Rate:</span>
                  <span className={classes.infoValue}>
                    {(pokemonDetails.fleeRate * 100).toFixed(1)}%
                  </span>
                </div>
                <div className={classes.infoSection}>
                  <div className={classes.infoLabel}>Resistant to:</div>
                  <div className={classes.typeList}>
                    {pokemonDetails.resistant.map((type, index) => (
                      <span key={index} className={classes.listType}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={classes.infoSection}>
                  <div className={classes.infoLabel}>Weak against:</div>
                  <div className={classes.typeList}>
                    {pokemonDetails.weaknesses.map((type, index) => (
                      <span key={index} className={classes.listType}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const useStyles = createUseStyles(
  {
    dialogTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    dialogButton: {
      '& path': {
        fill: '#333 !important',
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
    },
    image: {
      width: '80px',
      height: '80px',
      marginBottom: '24px',
    },
    details: {
      textAlign: 'center',
      width: '100%',
    },
    number: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '16px',
    },
    types: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '24px',
    },
    type: {
      padding: '6px 12px',
      borderRadius: '16px',
      fontSize: '14px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      backgroundColor: '#e0e0e0',
      color: '#333',
    },
    loading: {
      color: '#666',
      fontSize: '16px',
      marginTop: '16px',
    },
    detailedInfo: {
      marginTop: '24px',
      textAlign: 'left',
      padding: '0 16px',
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      fontSize: '14px',
    },
    infoLabel: {
      fontWeight: 'bold',
      color: '#333',
    },
    infoValue: {
      color: '#333',
    },
    infoSection: {
      marginTop: '16px',
    },
    typeList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px',
    },
    listType: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      backgroundColor: '#e0e0e0',
      color: '#333',
    },
  },
  { name: 'PokemonModal' }
);
