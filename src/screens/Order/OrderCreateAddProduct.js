import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import ListProduct from '../../components/ListProduct.js';
import SearchBox from '../../components/SearchBox.js';
import SplashScreen from '../SplashScreen/SplashScreen';
import IconBack from '../../components/IconBack.js';
import {haravan} from '../../apis/haravan/haravan.js';
import {getData, storeData} from '../../helpers/async_storage.js';
const fields = 'id,title,variants,body_html,published_at';
let page = 1;

const leftComponent = navigation => {
  return (
    <IconBack
      navigation={navigation}
      screenNext={'OrderCreate'}
      screenCurrent={'OrderCreateAddProduct'}
    />
  );
};

const fetchData = async (
  {setStateAll, stateAll},
  whereFn,
  isForceApi = false,
  isCacheData = true,
) => {
  try {
    let productData = await getData('@products');
    let dataUpdate = {};

    if (!productData) {
      productData = {data: [], expired: null};
    }

    if (
      productData &&
      (isForceApi ||
        !productData.expired ||
        new Date() > new Date(productData.expired))
    ) {
      await haravan.delayAPi();
      let data = await haravan.callApi({
        entity: haravan.ENTITY_PRODUCT,
        action: haravan.GET_PRODUCTS,
        params: {
          fields,
          page: page,
          limit: haravan.LIMIT_LIST,
          query: stateAll.textSearch,
        },
        whereFn,
      });

      if (data && Array.isArray(data.products) && data.products.length > 0) {
        let now = new Date();
        productData = {
          data: data.products,
          expired: new Date(now.getTime() + haravan.TIME_CACHE_API),
        };
        if (isCacheData && String(stateAll.textSearch).trim() === '') {
          await storeData('@products', productData);
        }
      }

      if (productData.data.length < haravan.LIMIT_LIST) {
        dataUpdate.isListEnd = true;
      }
    }

    dataUpdate.products = productData.data;
    dataUpdate.isLoading = false;

    setStateAll({
      ...stateAll,
      products: dataUpdate.products,
      isLoading: dataUpdate.isLoading,
      isListEnd: dataUpdate.isListEnd ? true : false,
      action: null,
    });
  } catch (error) {
    console.log(whereFn, error);
  }
};

function OrderCreateAddProduct({route, navigation}) {
  const [stateAll, setStateAll] = useState({
    isLoading: true,
    isFetchingLoadMore: false,
    isListEnd: false,
    textSearch: '',
    products: [],
    isClear: false,
    action: null, // 1: load more, 2: refresh, 3: search
  });

  const navigationNextFn = product => {
    navigation.navigate('OrderCreateAddVariant', {
      screen: 'OrderCreateAddProduct',
      data: {product},
    });
  };

  // init data
  useEffect(() => {
    page = 1;
    fetchData({setStateAll, stateAll}, 'OrderCreateAddProduct Init fetchData');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // hook action 1: load more, 2: refresh, 3: search
  useEffect(() => {
    if (stateAll.action === 1) {
      loadMoreData();
    } else if (stateAll.action === 2) {
      fetchData(
        {setStateAll, stateAll},
        'OrderCreateAddProduct onRefresh fetchData',
        true,
      );
    } else if (stateAll.action === 3) {
      fetchData(
        {setStateAll, stateAll},
        'OrderCreateAddProduct onSearch fetchData',
        stateAll.isClear ? false : true,
        false,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateAll.action]);

  const onLoadMoreData = () => {
    if (
      !stateAll.isFetchingLoadMore &&
      !stateAll.isLoading &&
      !stateAll.isListEnd
    ) {
      setStateAll({...stateAll, isFetchingLoadMore: true, action: 1});
    }
  };

  const loadMoreData = async () => {
    try {
      await haravan.delayAPi();
      let data = await haravan.callApi({
        entity: haravan.ENTITY_PRODUCT,
        action: haravan.GET_PRODUCTS,
        params: {
          fields,
          page: page + 1,
          limit: haravan.LIMIT_LIST,
          query: stateAll.textSearch,
        },
        whereFn: 'OrderCreateAddProduct loadMoreData',
      });

      if (data && Array.isArray(data.products) && data.products.length > 0) {
        //Successful response from the API Call
        page = page + 1;
        //After the response increasing the offset for the next API call.

        let dataUpdate = {
          products: [...stateAll.products, ...data.products],
          //adding the new data with old one available
          isFetchingLoadMore: false,
          //updating the loading state to false
        };
        if (data.products.length < haravan.LIMIT_LIST) {
          dataUpdate.isListEnd = true;
        }

        setStateAll({
          ...stateAll,
          products: dataUpdate.products,
          isFetchingLoadMore: dataUpdate.isFetchingLoadMore,
          isListEnd: dataUpdate.isListEnd ? true : false,
          action: null,
        });
      } else {
        setStateAll({
          ...stateAll,
          isFetchingLoadMore: false,
          isListEnd: true,
          action: null,
        });
      }
    } catch (error) {
      console.log('OrderCreateAddProduct loadMoreData:', error);
    }
  };

  const onRefreshData = () => {
    if (!stateAll.isFetchingLoadMore && !stateAll.isLoading) {
      setStateAll({
        ...stateAll,
        isLoading: true,
        isFetchingLoadMore: false,
        isListEnd: false,
        action: 2,
      });
      page = 1;
    }
  };

  const onSearchData = (textSearchTmp, isClear) => {
    if (!stateAll.isFetchingLoadMore && !stateAll.isLoading) {
      setStateAll({
        ...stateAll,
        isLoading: true,
        textSearch: textSearchTmp,
        isClear,
        action: 3,
      });

      page = 1;
    }
  };

  if (stateAll.isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <View
        style={common.container(1, 'column', {
          alignItems: 'center',
          backgroundColor: 'white',
        })}>
        <Header name={route.name} leftComponent={leftComponent(navigation)} />

        {/* ------------------- Filter --------------------- */}
        <SearchBox onSearch={onSearchData} textSearch={stateAll.textSearch} />
        {/* ------------------- LIST PRODUCT --------------------- */}
        <View
          style={[
            common.groupWidthHeight('100%', 'row'),
            common.marginTop(15),
          ]}>
          <ListProduct
            products={stateAll.products}
            navigationFn={navigationNextFn}
            isLoading={stateAll.isLoading}
            loadMoreData={onLoadMoreData}
            isFetchingLoadMore={stateAll.isFetchingLoadMore}
            onRefresh={onRefreshData}
          />
        </View>
      </View>
    );
  }
}

export default OrderCreateAddProduct;
