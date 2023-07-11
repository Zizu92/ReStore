import LoadingCompoment from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductsParams } from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to low'},
  {value: 'price', label: 'Price - Low to high'},
]

export default function Catalog () {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if(!productsLoaded) dispatch(fetchProductsAsync());  
    },[productsLoaded, dispatch])

    useEffect(() => {
      if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded] )

   if (!filtersLoaded)  return <LoadingCompoment message="Loading products..."/>

return(
    <Grid container columnSpacing = {4}>
      <Grid item xs={3}>
        <Paper sx={{mb: 2}}>
          <ProductSearch/>
        </Paper>
        <Paper sx={{mb: 2, p: 2}}>
          <RadioButtonGroup 
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setProductsParams({orderBy: e.target.value}))}
          />
        </Paper>
        <Paper  sx={{mb: 2, p: 2}}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => dispatch(setProductsParams({brands: items}))}
          />
        </Paper>
        <Paper  sx={{mb: 2, p: 2}}>
        <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => dispatch(setProductsParams({types: items}))}
          />
        </Paper>
      </Grid>
      <Grid item xs ={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}/>
      <Grid item xs={9} sx={{mb:2}}>
        {metaData &&
       <AppPagination 
       metaData={metaData} 
       onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} 
        />}
      </Grid>
    </Grid>
)
}