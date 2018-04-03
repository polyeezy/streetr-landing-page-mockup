FROM php:7.1.2-apache

# Enable apache mods.
RUN a2enmod php7.0
RUN a2enmod rewrite

