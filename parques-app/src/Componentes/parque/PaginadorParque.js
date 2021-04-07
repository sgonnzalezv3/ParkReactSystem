import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, makeStyles, TableContainer, TableFooter, TablePagination, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { paginacionParque } from '../../actions/parqueAction';
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
export const PaginadorParque = () => {
    const [textoBusquedaParque, setTextoBusquedaParque] = useState("");
    const typingBuscadorTexto = ControlTyping(textoBusquedaParque, 900);

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
        const obtenerListaParque = async () => {
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
            const response = await paginacionParque(objetoPaginadorRequest);
            setPaginadorResponse(response.data);
        }
        obtenerListaParque();
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
                LISTA DE PARQUES
            </Typography>
            <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        fullWidth
                        name="textoBusquedaParque"
                        variant="outlined"
                        label="Busca tu Parque"
                        onChange={e => setTextoBusquedaParque(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container>
                {paginadorResponse.listaObjetos.map((parque) => (
                    <Grid style={{ marginTop: '2.5REM' }} item xs={12} md={4} sm={6} key={parque.ParqueId} >
                        <Card className={classes.root} >
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={parque.Contenido || reactFoto}
                                    title="Contemplative Reptile"
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="h2">
                                        PARQUE {parque.Nombre.toUpperCase()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {parque.Descripcion}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Información
                                </Button>
                                <div className={classes.grow}></div>
                                <Typography size="small" color="primary">
                                    {parque.Extension} hectareas
                                </Typography>
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
                        labelRowsPerPage="Parques por pagina"
                    />
                </Grid>
            </Grid>
        </Container>


    )
}
