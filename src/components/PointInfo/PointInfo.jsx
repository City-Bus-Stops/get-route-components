import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Grid, Button, Header } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import BusStopBuses from '../BusStopBuses/BusStopBuses';
import PointBusStops from '../PointBusStops/PointBusStops';
import { PointName, SavedIcon, Text } from './pointInfoComponents';

const PointInfo = ({
    pointInfo, closePointInfo, loadRouteToBusStop, savePoint, getBusScheduleOnBusStop,
  }) => (
    <Modal
      open={!isEmpty(pointInfo)}
      size="small"
      dimmer="blurring"
      closeOnEscape={false}
      closeOnRootNodeClick={false}
    >
      <Modal.Header >
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column verticalAlign="middle" width={10}>
              <Header as="h2">
                <PointName>{pointInfo.name}</PointName>
                <Header.Subheader disabled>
                  <div>Distance <strong>~250</strong> m.</div>
                  Time to reach bus stop on foot <strong>~5 min</strong>.
                </Header.Subheader>
              </Header>
            </Grid.Column>
            {
              pointInfo.type === 'bus_stop' &&
              <Grid.Column textAlign="right" width={6}>
                {
                pointInfo.isSaved ?
                  <SavedIcon>
                    <Icon size="big" name="check circle" link />
                    Saved
                  </SavedIcon> :
                  <Icon
                    size="large"
                    name="save"
                    color="green"
                    circular
                    link
                    onClick={() => savePoint(pointInfo.pointId)}
                  />
              }
              </Grid.Column>
            }
          </Grid.Row>
        </Grid>
      </Modal.Header>
      <Modal.Content>
        <Grid>
          <BusStopBuses
            buses={pointInfo.buses}
            getBusScheduleOnBusStop={getBusScheduleOnBusStop}
          />
          {
            pointInfo.address &&
            <Grid.Row>
              <Grid.Column>
                <Text>
                  <Icon name="point" color="red" circular />
                  <strong>Address:</strong> {pointInfo.address}
                </Text>
              </Grid.Column>
            </Grid.Row>
          }
        </Grid>
        <PointBusStops
          busStops={pointInfo.busStops}
          loadRouteToBusStop={loadRouteToBusStop}
        />
      </Modal.Content>
      <Modal.Actions>
        {
          pointInfo.type === 'bus_stop' &&
          <Button
            primary
            size="large"
            onClick={() => loadRouteToBusStop(pointInfo.coords)}
          >
            Calculate route <Icon name="road" />
          </Button>
        }
        <Button
          positive
          size="large"
          onClick={closePointInfo}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
);

PointInfo.propTypes = {
  pointInfo: PropTypes.shape({
    type: PropTypes.string,
    info: PropTypes.shape(),
    buses: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  closePointInfo: PropTypes.func.isRequired,
  loadRouteToBusStop: PropTypes.func.isRequired,
  savePoint: PropTypes.func,
  getBusScheduleOnBusStop: PropTypes.func.isRequired,
};

PointInfo.defaultProps = {
  savePoint: () => {},
};

export default PointInfo;
