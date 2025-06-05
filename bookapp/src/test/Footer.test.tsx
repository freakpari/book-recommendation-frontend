import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer';
import styles from './Footer.module.scss';

describe('Footer Component', () => {
    beforeEach(() => {
        render(<Footer />);
    });

    it('should render the footer with correct className', () => {
        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toHaveClass(styles.footer);
    });

    it('should render company section with correct links', () => {
        expect(screen.getByText('شرکت')).toBeInTheDocument();
        expect(screen.getByText('درباره ما')).toHaveAttribute('href', '/AboutUs');
        expect(screen.getByText('قوانین و مقررات')).toHaveAttribute('href', '/rules');
    });

    it('should render help section with correct links', () => {
        expect(screen.getByText('راهنما')).toBeInTheDocument();
        expect(screen.getByText('سوالات متداول')).toHaveAttribute('href', '/questions');
        expect(screen.getByText('ایمیل پشتیبانی')).toBeInTheDocument();
    });

    it('should render social media section with correct links', () => {
        expect(screen.getByText('ما را دنبال کنید')).toBeInTheDocument();
        const instagramLink = screen.getByText('اینستاگرام');
        expect(instagramLink).toHaveAttribute(
            'href',
            'http://instagram.com/_u/{_s.mohamad.m_}/'
        );
        expect(screen.getByText('لینکدین')).toBeInTheDocument();
    });

    it('should render copyright text', () => {
        expect(
            screen.getByText(/© ۱۴۰۴ تمامی حقوق محفوظ است./i)
        ).toBeInTheDocument();
    });

    it('should render all sections', () => {
        const sections = screen.getAllByRole('list');
        expect(sections.length).toBe(4); // 3 sections + copyright
    });
});