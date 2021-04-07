import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const MenuIzquierda = ({ classes }) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="/auth/perfil">
                <i className="material-icons">account_box</i>
                <ListItemText
                    classes={{ primary: classes.ListItemText }}
                    primary="Perfil"
                />
            </ListItem>
        </List>
        <List>
            <ListItem component={Link} button to="/auth/perfil">
                <i className="material-icons">supervisor_account</i>
                <ListItemText
                    classes={{ primary: classes.ListItemText }}
                    primary="Gestion Usuarios"
                />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/curso/paginador">
                <i className="material-icons">event_note</i>
                <ListItemText
                    classes={{ primary: classes.ListItemText }}
                    primary="Mis reservaciones"
                />
            </ListItem>
        </List>
        <List>
            <ListItem component={Link} button to="/curso/paginador">
                <i className="material-icons">event_note</i>
                <ListItemText
                    classes={{ primary: classes.ListItemText }}
                    primary="Gestion de reservas"
                />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/parque/lista">
                <i className="material-icons">park</i>
                <ListItemText
                    classes={{ primary: classes.ListItemText }}
                    primary="Parques"
                />
            </ListItem>
        </List>
        <List>
            <ListItem component={Link} button to="/fauna/lista">
                <i className="material-icons">emoji_nature</i>
                <ListItemText
                    classes={{ primary: classes.ListItemText }}
                    primary="Fauna y Flora"
                />
            </ListItem>
        </List>
        <Divider />

        <List>
            <ListItem component={Link} button to="/Instructor/nuevo">
                <i className="material-icons">corporate_fare</i>
                <ListItemText
                    classes={{ primary: classes.ListItemText }}
                    primary="Car's"
                />
            </ListItem>
        </List>
    </div>
);
