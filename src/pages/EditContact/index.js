/* eslint-disable react/jsx-no-bind */
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
        );

        contactFormRef.current.setFieldsValue(contact);
        setIsLoading(false);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado',
        });
      }
    }

    loadContact();
  }, [history, id]);

  function handleSubmit() {
    //
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title="Editar Anderson Silva"
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterções"
        onSubmit={handleSubmit}
      />
    </>
  );
}
