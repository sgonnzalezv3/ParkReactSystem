import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, makeStyles, TableContainer, TableFooter, TablePagination, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { paginacionFauna } from '../../actions/faunaAction';
import reactFoto from '../../logo.svg';
import { ControlTyping } from '../Tool/ControlTyping';
const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.up("md")]: {
        root: {
            maxWidth: 405,
            height: '100%'
        },
    },
    media: {
        height: '15rem',
        maxWidth: '100%'
    },
    grow: {
        flexGrow: 1
    },
}));
export const PaginadorFauna = () => {
    const [textoBusquedaFauna, setTextoBusquedaFauna] = useState("");
    const typingBuscadorTexto = ControlTyping(textoBusquedaFauna, 900);

    const classes = useStyles();
    const [paginadorRequest, setPaginadorRequest] = useState({
        nombre: "",
        numeroPagina: 0,
        cantidadElementos: 3
    });
    const [paginadorResponse, setPaginadorResponse] = useState({
        listaObjetos: [],
        totalRecords: 0,
        numeroPaginas: 0
    });
    useEffect(() => {
        const obtenerListaFauna = async () => {
            let tituloVariant = "";
            let paginaVariant = paginadorRequest.numeroPagina + 1;

            if (typingBuscadorTexto) {
                tituloVariant = typingBuscadorTexto;
                paginaVariant = 1
            }
            //objeto json que envia al action
            const objetoPaginadorRequest = {
                nombre: tituloVariant,
                numeroPagina: paginaVariant,
                cantidadElementos: paginadorRequest.cantidadElementos
            }
            /* obteniendo el response */
            const response = await paginacionFauna(objetoPaginadorRequest);
            setPaginadorResponse(response.data);
        }
        obtenerListaFauna();
    }, [paginadorRequest,typingBuscadorTexto]) // cada vez que se actualice el paginador request, el useffect se dispara  
    const cambiarPagina = (event, nuevaPagina) => {

        setPaginadorRequest((anterior) => ({
            ...anterior,
            numeroPagina: parseInt(nuevaPagina)
        }));
    }

    const cambiarCantidadRecords = (event) => {
        setPaginadorRequest((anterior) => ({
            ...anterior,
            cantidadElementos: parseInt(event.target.value),
            numeroPagina: 0
        }))
    }


    return (
        <Container>
            <Typography gutterBottom variant="h3" component="h1" style={{ textAlign: 'center', color: '#8bc34a' }}>
                LISTA DE FAUNAS
            </Typography>
            <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        fullWidth
                        name="textoBusquedaFauna"
                        variant="outlined"
                        label="Busca tu Fauna"
                        onChange={e => setTextoBusquedaFauna(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container>
                {paginadorResponse.listaObjetos.map((fauna) => (
                    
                    <Grid style={{ marginTop: '2.5REM' }} item xs={12} md={4} sm={6} key={fauna.EcosistemaId} >
                        <Card className={classes.root} >
                        {console.log(fauna)}
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={fauna.Contenido || reactFoto}
                                    title="Contemplative Reptile"
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {fauna.Nombre.toUpperCase()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {fauna.Descripcion}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                {fauna.NombreCientifico}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12} md={12} style={{ marginTop: '2rem', marginBottom: '1rem' }} container justify="center" >
                    <TablePagination
                        style={{ color: "#8bc34a" }}
                        rowsPerPageOptions={[3, 6, 9, 12]}
                        count={paginadorResponse.totalRecords}
                        rowsPerPage={paginadorRequest.cantidadElementos}
                        page={paginadorRequest.numeroPagina}
                        onChangePage={cambiarPagina}
                        onChangeRowsPerPage={cambiarCantidadRecords}
                        labelRowsPerPage="Faunas por pagina"
                    />
                </Grid>
            </Grid>
        </Container>


    )
}
