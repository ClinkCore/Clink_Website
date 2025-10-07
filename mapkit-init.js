// Apple MapKit JS Initialization
(function() {
    'use strict';

    // Configuration
    const LOCATION = {
        latitude: 30.614445,
        longitude: -96.32797,
        title: 'Clink HQ',
        subtitle: '1511 Texas Ave S, College Station, TX 77840'
    };

    // Get token from serverless function
    async function getMapKitToken() {
        const endpoints = [
            '/api/mapkit-token',           // Vercel or local
            '/.netlify/functions/mapkit-token' // Netlify
        ];

        for (const endpoint of endpoints) {
            try {
                console.log(`Trying to fetch token from: ${endpoint}`);
                const response = await fetch(endpoint);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ Token fetched successfully');
                    return data.token;
                }
                console.log(`❌ ${endpoint} failed with status: ${response.status}`);
            } catch (error) {
                console.log(`❌ ${endpoint} error:`, error.message);
            }
        }
        
        throw new Error('Failed to fetch MapKit token from all endpoints');
    }

    // Initialize MapKit
    async function initMapKit() {
        try {
            const token = await getMapKitToken();

            // Setup MapKit
            mapkit.init({
                authorizationCallback: function(done) {
                    done(token);
                },
                language: 'en'
            });

            // Create map
            const map = new mapkit.Map('apple-map', {
                center: new mapkit.Coordinate(LOCATION.latitude, LOCATION.longitude),
                colorScheme: mapkit.Map.ColorSchemes.Dark,
                showsCompass: mapkit.FeatureVisibility.Hidden,
                showsMapTypeControl: false,
                showsZoomControl: true,
                showsUserLocationControl: false,
                showsPointsOfInterest: true,
                isRotationEnabled: false
            });

            // Add annotation (marker)
            const annotation = new mapkit.MarkerAnnotation(
                new mapkit.Coordinate(LOCATION.latitude, LOCATION.longitude),
                {
                    color: '#E265FF',
                    glyphText: '📍',
                    title: LOCATION.title,
                    subtitle: LOCATION.subtitle,
                    displayPriority: 1000
                }
            );

            map.addAnnotation(annotation);

            // Set appropriate zoom level
            const region = new mapkit.CoordinateRegion(
                new mapkit.Coordinate(LOCATION.latitude, LOCATION.longitude),
                new mapkit.CoordinateSpan(0.01, 0.01)
            );
            map.setRegionAnimated(region);

            console.log('Apple Maps initialized successfully');
        } catch (error) {
            console.error('Error initializing Apple Maps:', error);
            // Fallback: Show a message or static image
            const mapElement = document.getElementById('apple-map');
            if (mapElement) {
                mapElement.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #1c1c1e; color: white; flex-direction: column; gap: 20px;">
                        <div style="font-size: 48px;">📍</div>
                        <div style="text-align: center;">
                            <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Clink HQ</div>
                            <div style="font-size: 14px; color: rgba(255,255,255,0.7);">1511 Texas Ave S<br>College Station, TX 77840</div>
                            <a href="https://maps.apple.com/?address=1511%20Texas%20Ave%20S,%20College%20Station,%20TX%2077840" 
                               target="_blank" 
                               style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #E265FF; color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">
                                Open in Apple Maps
                            </a>
                        </div>
                    </div>
                `;
            }
        }
    }

    // Wait for MapKit to load
    if (window.mapkit) {
        initMapKit();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            if (window.mapkit) {
                initMapKit();
            } else {
                // If MapKit fails to load, wait a bit and try again
                setTimeout(function() {
                    if (window.mapkit) {
                        initMapKit();
                    } else {
                        console.error('MapKit failed to load');
                    }
                }, 2000);
            }
        });
    }
})();
