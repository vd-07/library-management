import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAuthor } from 'app/shared/model/author.model';
import { getEntities as getAuthors } from 'app/entities/author/author.reducer';
import { IPublisher } from 'app/shared/model/publisher.model';
import { getEntities as getPublishers } from 'app/entities/publisher/publisher.reducer';
import { IBook } from 'app/shared/model/book.model';
import { getEntity, updateEntity, createEntity, reset } from './book.reducer';

export const BookUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const authors = useAppSelector(state => state.author.entities);
  const publishers = useAppSelector(state => state.publisher.entities);
  const bookEntity = useAppSelector(state => state.book.entity);
  const loading = useAppSelector(state => state.book.loading);
  const updating = useAppSelector(state => state.book.updating);
  const updateSuccess = useAppSelector(state => state.book.updateSuccess);
  const handleClose = () => {
    props.history.push('/book' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getAuthors({}));
    dispatch(getPublishers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...bookEntity,
      ...values,
      author: authors.find(it => it.id.toString() === values.author.toString()),
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
          ...bookEntity,
          author: bookEntity?.author?.id,
          publisher: bookEntity?.publisher?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="libraryManagementApp.book.home.createOrEditLabel" data-cy="BookCreateUpdateHeading">
            Create or edit a Book
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="book-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Title"
                id="book-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Isbn"
                id="book-isbn"
                name="isbn"
                data-cy="isbn"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="book-author" name="author" data-cy="author" label="Author" type="select">
                <option value="" key="0" />
                {authors
                  ? authors.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="book-publisher" name="publisher" data-cy="publisher" label="Publisher" type="select">
                <option value="" key="0" />
                {publishers
                  ? publishers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/book" replace color="info">
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

export default BookUpdate;
