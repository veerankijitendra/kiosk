'use client';

import { useState, type JSX } from 'react';
// import api from '@/services/api';
// import { useAppDispatch } from '@/store/hooks';
// import { setSelectedDepartment } from '@/store/slices/tokenSlice';
import './SelectDepartment.css';
import { MedicalServices, Search, Stethoscope, ArrowBack } from '../../components/common/icons';
import * as Icons from '../../components/common/icons';
import KioskCustomHeader from '../../components/common/kioskCustomHeader/KioskCustomHeader';
import InputField from '../../components/common/input/Input';
import KioskButton from '../../components/common/button';
import DepartmentCard from '../../components/common/departmentCard/DepartmentCard';
import Footer from '../../components/common/footer';
import { useDepartment } from '../../hooks/queries/useDepartment';
import type { DepartmentResponseType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { navigateWithDirection } from '../../utils/commonFunctions';
import { ROUTES } from '../../utils/routeConstants';
import { useKioskStore } from '../../store/useKioskStore';

type DepartmentType = DepartmentResponseType['data'][0];

export default function SelectDepartment() {
  const [search, setSearch] = useState('');

  const { data, isError, isLoading } = useDepartment();

  const navigate = useNavigate();

  const setDepartment = useKioskStore((state) => state.setDepartment);

  const iconMap = [
    { key: 'car', icon: Icons.Heart }, // Cardiology
    { key: 'neu', icon: Icons.Brain }, // Neurology
    { key: 'ort', icon: Icons.Spine }, // Orthopedics
    { key: 'ped', icon: Icons.Baby }, // Pediatrics
    { key: 'ent', icon: Icons.Hearing }, // ENT
    { key: 'der', icon: Icons.Skin }, // Dermatology
    { key: 'gen', icon: Icons.Stethoscope }, // General Medicine
    { key: 'oph', icon: Icons.Eye }, // Ophthalmology
    { key: 'eye', icon: Icons.Eye }, // Eye alias
    { key: 'den', icon: Icons.Tooth }, // Dental
    { key: 'gyn', icon: Icons.Gynecology }, // Gynecology
    { key: 'uro', icon: Icons.Kidney }, // Urology
    { key: 'pul', icon: Icons.Lungs }, // Pulmonology
    { key: 'onc', icon: Icons.Cancer }, // Oncology
    { key: 'rad', icon: Icons.XRay }, // Radiology
    { key: 'eme', icon: Icons.Ambulance }, // Emergency
    { key: 'pha', icon: Icons.Pharmacy }, // Pharmacy
    { key: 'phy', icon: Icons.Physio }, // Physiotherapy
    { key: 'psy', icon: Icons.Psychology }, // Psychiatry
    { key: 'nep', icon: Icons.Nephrology }, // Nephrology
    { key: 'gas', icon: Icons.Gastro }, // Gastroenterology
    { key: 'end', icon: Icons.Endocrine }, // Endocrinology
  ];

  const getIcon = (department: string): JSX.Element => {
    const iconStyle = { fontSize: '2.5rem' };

    const name = department.toLowerCase();

    const match = iconMap.find((item) => name.includes(item.key));

    const Icon = match ? match.icon : Stethoscope;
    return <Icon style={iconStyle} />;
  };

  const filtered = (Array.isArray(data?.data) ? data.data : [])?.filter((d: DepartmentType) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (dept: DepartmentType) => {
    setDepartment(dept);
    console.log(dept);
    navigateWithDirection(navigate, '/' + ROUTES.DOCTORS, 1);
  };

  const handleBack = () => {
    navigateWithDirection(navigate, '/' + ROUTES.WELCOME, -1);
  };

  return (
    <div className='select-department'>
      {/* Top Bar / Header Section */}
      <KioskCustomHeader.Root>
        <KioskCustomHeader.Content>
          <div className='select-department__icon-pb'>
            <KioskCustomHeader.IconWrapper>
              <KioskCustomHeader.Icon>
                <MedicalServices />
              </KioskCustomHeader.Icon>
            </KioskCustomHeader.IconWrapper>
          </div>
          <KioskCustomHeader.Title>Select Department</KioskCustomHeader.Title>
          <KioskCustomHeader.SubTitle>
            Please choose the department you want to visit.
          </KioskCustomHeader.SubTitle>
          <InputField.Root>
            <InputField.Wrapper>
              <InputField.LeadingIcon>
                <Search />
              </InputField.LeadingIcon>
              <InputField.Input
                placeholder='Search department...'
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputField.Wrapper>
          </InputField.Root>
        </KioskCustomHeader.Content>
      </KioskCustomHeader.Root>

      {/* Main Content: Grid of Department Cards */}
      <main className='select-department__main'>
        <div className='select-department__grid'>
          {isLoading || isError ? (
            <div className='select-department__loading'>Loading departments...</div>
          ) : (
            filtered?.map((dept: DepartmentResponseType['data'][0]) => (
              <>
                <DepartmentCard.Root key={dept._id} onSelect={handleSelect} department={dept}>
                  <DepartmentCard.Content className='select-department__card-wrapper__row'>
                    <DepartmentCard.Icon>
                      {/* <Stethoscope style={{ fontSize: '2.5rem' }} /> */}
                      {getIcon(dept.name)}
                    </DepartmentCard.Icon>
                    <div>
                      <DepartmentCard.Title>{dept.name}</DepartmentCard.Title>
                      <DepartmentCard.Description>{dept.prefix}</DepartmentCard.Description>
                    </div>
                  </DepartmentCard.Content>
                </DepartmentCard.Root>
              </>
            ))
          )}
        </div>
      </main>
      {/* Footer Navigation Section */}
      <Footer.Root variant='sticky'>
        <Footer.Actions align='space-between'>
          <KioskButton.Root variant='back' onClick={handleBack} size='large'>
            <KioskButton.StartIcon>
              <ArrowBack />
            </KioskButton.StartIcon>
            <KioskButton.Text>Back</KioskButton.Text>
          </KioskButton.Root>
        </Footer.Actions>
      </Footer.Root>

      {/* <footer className="select-department__footer">
        <button onClick={onBack} className="select-department__back-button">
          <span className="material-symbols-outlined select-department__back-icon">
            <ArrowBack />
          </span>
          <span>Back</span>
        </button>
      </footer> */}
    </div>
  );
}
