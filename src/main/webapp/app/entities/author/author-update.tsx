import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPublisher } from 'app/shared/model/publisher.model';
import { getEntities as getPublishers } from 'app/entities/publisher/publisher.reducer';
import { IAuthor } from 'app/shared/model/author.model';
import { getEntity, updateEntity, createEntity, reset } from './author.reducer';

export const AuthorUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const publishers = useAppSelector(state => state.publisher.entities);
  const authorEntity = useAppSelector(state => state.author.entity);
  const loading = useAppSelector(state => state.author.loading);
  const updating = useAppSelector(state => state.author.updating);
  const updateSuccess = useAppSelector(state => state.author.updateSuccess);
  const handleClose = () => {
    props.history.push('/author' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getPublishers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...authorEntity,
      ...values,
      publisher: publishers.find(it => it.id.toString() === values.publisher.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...authorEntity,
          publisher: authorEntity?.publisher?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="libraryManagementApp.author.home.createOrEditLabel" data-cy="AuthorCreateUpdateHeading">
            Create or edit a Author
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="author-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Name"
                id="author-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="author-publisher" name="publisher" data-cy="publisher" label="Publisher" type="select">
                <option value="" key="0" />
                {publishers
                  ? publishers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/author" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AuthorUpdate;
