import { call, put, takeLatest, take, race, fork, takeEvery, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';

import {
  fetchFindUsertLocation,
  fetchFindUserAddress,
  fetchSearchRoute,
  fetchRouteInfo,
  fetchRouteGeoData,
  fetchMapPointInfo,
  fetchUserPointInfo,
  fetchRouteBetweenPoints,
  fetchNearestBusStops,
  fetchFavorites,
  fetchBusStopGeoData,
  fetchLoadUsers,
  fetchRegisterUser,
  fetchDeleteUser,
  fetchLogin,
  fetchSignup,
} from '../api/api';
import {
  FIND_USER_LOCATION,
  FIND_USER_LOCATION_SUCCESS,
  FIND_USER_ADDRESS,
  FIND_USER_ADDRESS_SUCCESS,
  SEARCH_ROUTE,
  SEARCH_ROUTE_SUCCESS,
  LOAD_ROUTE_INFO,
  LOAD_ROUTE_INFO_SUCCESS,
  CLEAR_ROUTE_INFO,
  LOAD_ROUTE_GEODATA,
  LOAD_ROUTE_GEODATA_SUCCESS,
  LOAD_MAP_POINT_INFO,
  LOAD_MAP_POINT_INFO_SUCCESS,
  LOAD_USER_POINT_INFO,
  LOAD_USER_POINT_INFO_SUCCESS,
  CLEAR_MAP_POINT_INFO,
  SEND_REQUEST,
  RECEIVE_RESPONSE,
  LOAD_ROUTE_BETWEEN_POINTS,
  LOAD_ROUTE_BETWEEN_POINTS_SUCCESS,
  FIND_NEAREST_BUS_STOPS,
  FIND_NEAREST_BUS_STOPS_SUCCESS,
  LOAD_FAVORITES,
  LOAD_FAVORITES_SUCCESS,
  LOAD_BUS_STOP_GEODATA,
  LOAD_BUS_STOP_GEODATA_SUCCESS,
  SAVE_TO_FAVORITES,
  SAVE_TO_FAVORITES_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOAD_USERS,
  RECEIVE_USERS,
  CHANGE_USER_STATUS,
  CHANGE_USER_STATUS_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  CHANGE_FILTER,
  SET_FILTER,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  API_ERROR,
} from '../actions/actions';

function* findUserLocation() {
  try {
    yield put({ type: SEND_REQUEST });
    const location = yield call(fetchFindUsertLocation);
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: FIND_USER_LOCATION_SUCCESS, location });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* findUserAddress(action) {
  const { field } = action;
  try {
    yield put({ type: FIND_USER_LOCATION });
    const { location } = yield take(FIND_USER_LOCATION_SUCCESS);
    const { coords } = location;
    yield put({ type: SEND_REQUEST });
    const response = yield call(fetchFindUserAddress, coords);
    yield put({ type: RECEIVE_RESPONSE });
    const { address } = response;
    yield put({ type: FIND_USER_ADDRESS_SUCCESS, address, coords, field });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* searchRoute(action) {
  const { params: { from, to }, predicate } = action;
  try {
    yield put({ type: SEND_REQUEST });
    const response = yield call(fetchSearchRoute, from, to);
    yield put({ type: RECEIVE_RESPONSE });
    const { routes } = response;
    yield put({ type: SEARCH_ROUTE_SUCCESS, routes, predicate });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* loadRouteInfo(action) {
  const { routeId, predicate } = action;
  try {
    const response = yield call(fetchRouteInfo, routeId);
    const { info } = response;
    yield put({ type: LOAD_ROUTE_INFO_SUCCESS, info, routeId, predicate });
  } catch (err) {
    yield put({ type: API_ERROR, err });
  }
}

function* pollRouteInfo(routeId, predicate) {
  try {
    yield call(delay, 60000);
    yield put({ type: LOAD_ROUTE_INFO, routeId, predicate });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* watchPollRouteInfo() {
  while (true) {
    const { routeId, predicate } = yield take(LOAD_ROUTE_INFO_SUCCESS);
    yield race([
      call(pollRouteInfo, routeId, predicate),
      take(CLEAR_ROUTE_INFO),
    ]);
  }
}

function* pollPointInfo(pointId, predicate) {
  try {
    yield call(delay, 60000);
    yield put({ type: LOAD_MAP_POINT_INFO, pointId, predicate });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* watchPollPointInfo() {
  while (true) {
    const { pointId, predicate } = yield take(LOAD_MAP_POINT_INFO_SUCCESS);
    yield race([
      call(pollPointInfo, pointId, predicate),
      take(CLEAR_MAP_POINT_INFO),
    ]);
  }
}

function* loadRouteGeoData(action) {
  const { routeId } = action;
  try {
    yield put({ type: SEND_REQUEST });
    const { geoData } = yield call(fetchRouteGeoData, routeId);
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: LOAD_ROUTE_GEODATA_SUCCESS, geoData });
    yield put(push('/map'));
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* loadMapPointInfo(action) {
  const { pointId, predicate } = action;
  try {
    const response = yield call(fetchMapPointInfo, pointId);
    const { info } = response;
    yield put({ type: LOAD_MAP_POINT_INFO_SUCCESS, info, pointId, predicate });
  } catch (err) {
    yield put({ type: API_ERROR, err });
  }
}

function* loadUserPointInfo(action) {
  const { predicate } = action;
  try {
    yield put({ type: FIND_USER_LOCATION });
    const { location } = yield take(FIND_USER_LOCATION_SUCCESS);
    const { coords } = location;
    yield put({ type: SEND_REQUEST });
    const info = yield call(fetchUserPointInfo, coords);
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: LOAD_USER_POINT_INFO_SUCCESS, info, predicate });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* loadRouteBetweenPoints(action) {
  const { startPoint, endPoint, predicate } = action;
  try {
    yield put({ type: SEND_REQUEST });
    const geoData = yield call(fetchRouteBetweenPoints, startPoint, endPoint);
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: LOAD_ROUTE_BETWEEN_POINTS_SUCCESS, geoData, predicate });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* findNearestBusStops() {
  try {
    yield put({ type: FIND_USER_LOCATION });
    const { location } = yield take(FIND_USER_LOCATION_SUCCESS);
    const { coords } = location;
    yield put({ type: SEND_REQUEST });
    const geoData = yield call(fetchNearestBusStops, coords);
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: FIND_NEAREST_BUS_STOPS_SUCCESS, geoData });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* loadFavorites(action) {
  const { predicate } = action;
  try {
    yield put({ type: SEND_REQUEST });
    const favorites = yield call(fetchFavorites);
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: LOAD_FAVORITES_SUCCESS, favorites, predicate });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* loadBusStopGeoData(action) {
  const { busStopId } = action;
  try {
    yield put({ type: SEND_REQUEST });
    const { geoData } = yield call(fetchBusStopGeoData, busStopId);
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: LOAD_BUS_STOP_GEODATA_SUCCESS, geoData });
    yield put(push('/map'));
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* saveToFavorites(action) {
  const { id, predicate } = action;
  try {
    yield put({ type: SEND_REQUEST });
    /** TODO Send request to save **/
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: SAVE_TO_FAVORITES_SUCCESS, id, predicate });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* registerUser(action) {
  const { params } = action;
  try {
    const sendedUser = {
      ...params,
      isActive: true,
    };
    yield put({ type: SEND_REQUEST });
    const user = yield call(fetchRegisterUser, sendedUser);
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: REGISTER_USER_SUCCESS, user });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* loadUsers() {
  try {
    yield put({ type: SEND_REQUEST });
    const users = yield call(fetchLoadUsers);
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: RECEIVE_USERS, users });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* changeUserStatus(action) {
  const { id, isActive } = action;
  try {
    yield put({ type: SEND_REQUEST });
    /** TODO send request to update user status **/
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: CHANGE_USER_STATUS_SUCCESS, id, isActive: !isActive });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* deleteUser(action) {
  const { id } = action;
  try {
    yield put({ type: SEND_REQUEST });
    yield call(fetchDeleteUser, id);
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: DELETE_USER_SUCCESS, id });
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: API_ERROR, err });
  }
}

function* onFilterChanged(filter, predicate) {
  try {
    yield call(delay, 500);
    yield put({ type: SET_FILTER, filter, predicate });
  } catch (err) {
    yield put({ type: API_ERROR, err });
  }
}

function* watchChangeFilter() {
  let task;
  while (true) {
    const { filter, predicate } = yield take(CHANGE_FILTER);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(onFilterChanged, filter, predicate);
  }
}

function* login(action) {
  const { email, password } = action;
  try {
    yield put({ type: SEND_REQUEST });
    const { userData } = yield call(fetchLogin, { email, password });
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: LOGIN_SUCCESS, userData });
    yield put(push('/'));
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: LOGIN_FAILURE, err });
  }
}

function* signup(action) {
  const { email, password, username } = action;
  try {
    yield put({ type: SEND_REQUEST });
    yield call(fetchSignup, { email, password, username });
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: SIGN_UP_SUCCESS });
    yield put(push('/login'));
  } catch (err) {
    yield put({ type: RECEIVE_RESPONSE });
    yield put({ type: SIGN_UP_FAILURE, err });
  }
}

function* appSaga() {
  yield takeLatest(FIND_USER_LOCATION, findUserLocation);
  yield takeLatest(FIND_USER_ADDRESS, findUserAddress);
  yield takeLatest(SEARCH_ROUTE, searchRoute);
  yield takeLatest(LOAD_ROUTE_INFO, loadRouteInfo);
  yield takeLatest(LOAD_ROUTE_GEODATA, loadRouteGeoData);
  yield takeLatest(LOAD_MAP_POINT_INFO, loadMapPointInfo);
  yield takeLatest(LOAD_USER_POINT_INFO, loadUserPointInfo);
  yield takeEvery(LOAD_ROUTE_BETWEEN_POINTS, loadRouteBetweenPoints);
  yield takeEvery(FIND_NEAREST_BUS_STOPS, findNearestBusStops);
  yield takeEvery(LOAD_FAVORITES, loadFavorites);
  yield takeEvery(LOAD_BUS_STOP_GEODATA, loadBusStopGeoData);
  yield takeEvery(SAVE_TO_FAVORITES, saveToFavorites);
  yield takeEvery(REGISTER_USER, registerUser);
  yield takeEvery(LOAD_USERS, loadUsers);
  yield takeEvery(CHANGE_USER_STATUS, changeUserStatus);
  yield takeEvery(DELETE_USER, deleteUser);
  yield takeEvery(LOGIN, login);
  yield takeEvery(SIGN_UP, signup)
  yield fork(watchChangeFilter);
  yield [fork(watchPollRouteInfo), fork(watchPollPointInfo)];
}
export default appSaga;
