import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { Check, Bolt } from '@mui/icons-material';
import './plans.scss';

const plans = [
    {
        name: "Starter",
        price: "₹450",
        description: "Perfect for individuals and small projects",
        features: ["1 office", "5GB storage", "max staff size 90 employees"],
        recommended: false,
    },
    {
        name: "Pro",
        price: "₹500",
        description: "Ideal for growing teams and businesses",
        features: [
            "5 users",
            "Unlimited projects",
            "50GB storage",
            "Priority support",
            "max staff size 100 employees"
        ],
        // recommended: true,
        recommended: false,
    },
    {
        name: "Enterprise",
        // price: "Custom",
        price: "₹1000",
        description: "Tailored solutions for large organizations",
        features: [
            "Unlimited users",
            "Unlimited projects",
            "Unlimited storage",
            "24/7 dedicated support",
            "Custom integrations",
            "max staff size 100 employees",
        ],
        recommended: false,
    },
];

export default function Plans() {
    return (
        <Box className="subscription-plans">
            <Typography variant="h2" className="title">
                Choose Your Plan
            </Typography>
            <Typography variant="h5" className="subtitle">
                Select the perfect plan to suit your needs and scale your projects
            </Typography>
            <Grid container spacing={4} className="plans-container">
                {plans.map((plan) => (
                    <Grid item xs={12} md={6} lg={4} key={plan.name}>
                        <Card className={`plan-card ${plan.recommended ? 'recommended' : ''}`}>
                            <CardContent>
                                <Box className="plan-header">
                                    <Typography variant="h4" className="plan-name">
                                        {plan.name}
                                    </Typography>
                                    {plan.recommended && (
                                        <Typography variant="caption" className="recommended-badge">
                                            Recommended
                                        </Typography>
                                    )}
                                </Box>
                                <Typography variant="body1" className="plan-description">
                                    {plan.description}
                                </Typography>
                                <Typography variant="h3" className="plan-price">
                                    {plan.price}
                                    <Typography variant="body2" component="span" className="price-period">
                                        /month
                                    </Typography>
                                </Typography>
                                <List className="feature-list">
                                    {plan.features.map((feature) => (
                                        <ListItem key={feature} disableGutters>
                                            <ListItemIcon className="feature-icon">
                                                <Check />
                                            </ListItemIcon>
                                            <ListItemText primary={feature} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                            <CardActions className="plan-actions">
                                <Button
                                    variant={plan.recommended ? "contained" : "outlined"}
                                    color="primary"
                                    fullWidth
                                    startIcon={plan.recommended ? <Bolt /> : null}
                                >
                                    Choose Plan
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

