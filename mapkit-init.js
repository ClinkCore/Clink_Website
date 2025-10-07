// Apple MapKit JS Initialization with Custom Controls
(function() {
    'use strict';

    console.log('🗺️ MapKit initialization script loaded');

    const LOCATION = {
        latitude: 30.614445,
        longitude: -96.32797,
        title: 'Clink HQ',
        subtitle: '1511 Texas Ave S, College Station, TX 77840'
    };

    let mapInstance = null;
    let currentMapType = 'standard';

    async function getMapKitToken() {
        const endpoints = ['/api/mapkit-token', '/.netlify/functions/mapkit-token'];
        for (const endpoint of endpoints) {
            try {
                console.log(`🔑 Fetching token from: ${endpoint}`);
                const response = await fetch(endpoint);
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ Token fetched successfully');
                    return data.token;
                }
            } catch (error) {
                console.log(`❌ ${endpoint} error:`, error.message);
            }
        }
        throw new Error('Failed to fetch MapKit token');
    }

    function createCustomControls() {
        const controlsHTML = `
            <div class="map-controls">
                <button class="map-control-btn" id="map-zoom-in" title="Zoom In">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <button class="map-control-btn" id="map-zoom-out" title="Zoom Out">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <button class="map-control-btn" id="map-reset" title="Reset View">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                        <path d="M21 3v5h-5"></path>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                        <path d="M3 21v-5h5"></path>
                    </svg>
                </button>
                <button class="map-control-btn" id="map-type-toggle" title="Change Map Type">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                    </svg>
                </button>
            </div>
        `;
        return controlsHTML;
    }

    function attachControlListeners() {
        // Zoom In
        document.getElementById('map-zoom-in')?.addEventListener('click', function() {
            if (mapInstance) {
                const currentZoom = mapInstance.region.span;
                mapInstance.region = new mapkit.CoordinateRegion(
                    mapInstance.center,
                    new mapkit.CoordinateSpan(currentZoom.latitudeDelta * 0.5, currentZoom.longitudeDelta * 0.5)
                );
            }
        });

        // Zoom Out
        document.getElementById('map-zoom-out')?.addEventListener('click', function() {
            if (mapInstance) {
                const currentZoom = mapInstance.region.span;
                mapInstance.region = new mapkit.CoordinateRegion(
                    mapInstance.center,
                    new mapkit.CoordinateSpan(currentZoom.latitudeDelta * 2, currentZoom.longitudeDelta * 2)
                );
            }
        });

        // Reset View
        document.getElementById('map-reset')?.addEventListener('click', function() {
            if (mapInstance) {
                mapInstance.region = new mapkit.CoordinateRegion(
                    new mapkit.Coordinate(LOCATION.latitude, LOCATION.longitude),
                    new mapkit.CoordinateSpan(0.01, 0.01)
                );
            }
        });

        // Toggle Map Type
        document.getElementById('map-type-toggle')?.addEventListener('click', function() {
            if (mapInstance) {
                const types = [
                    mapkit.Map.MapTypes.Standard,
                    mapkit.Map.MapTypes.Satellite,
                    mapkit.Map.MapTypes.Hybrid
                ];
                const typeNames = ['standard', 'satellite', 'hybrid'];
                const currentIndex = typeNames.indexOf(currentMapType);
                const nextIndex = (currentIndex + 1) % types.length;
                
                currentMapType = typeNames[nextIndex];
                mapInstance.mapType = types[nextIndex];
                
                console.log('Map type changed to:', currentMapType);
            }
        });
    }

    async function initMapKit() {
        console.log('🚀 Starting MapKit initialization...');
        
        try {
            if (typeof mapkit === 'undefined') {
                throw new Error('MapKit JS library not loaded');
            }

            console.log('✅ MapKit library loaded, version:', mapkit.version);

            const token = await getMapKitToken();
            
            mapkit.init({
                authorizationCallback: function(done) {
                    console.log('🔑 Authorization callback invoked');
                    done(token);
                },
                language: 'en'
            });

            console.log('✅ MapKit initialized');
            await new Promise(resolve => setTimeout(resolve, 500));

            const mapElement = document.getElementById('apple-map');
            if (!mapElement) {
                throw new Error('Map container not found');
            }

            // Clear and add controls
            mapElement.innerHTML = createCustomControls();
            
            console.log('🗺️ Creating map...');

            mapInstance = new mapkit.Map('apple-map', {
                center: new mapkit.Coordinate(LOCATION.latitude, LOCATION.longitude),
                colorScheme: mapkit.Map.ColorSchemes.Dark,
                showsCompass: mapkit.FeatureVisibility.Hidden,
                showsMapTypeControl: false,
                showsZoomControl: false,
                showsUserLocationControl: false,
                showsPointsOfInterest: true,
                isRotationEnabled: true,
                isScrollEnabled: true,
                isZoomEnabled: true
            });

            console.log('✅ Map created');

            const annotation = new mapkit.MarkerAnnotation(
                new mapkit.Coordinate(LOCATION.latitude, LOCATION.longitude),
                {
                    color: '#E265FF',
                    title: LOCATION.title,
                    subtitle: LOCATION.subtitle
                }
            );

            mapInstance.addAnnotation(annotation);

            const region = new mapkit.CoordinateRegion(
                new mapkit.Coordinate(LOCATION.latitude, LOCATION.longitude),
                new mapkit.CoordinateSpan(0.01, 0.01)
            );
            
            mapInstance.region = region;

            // Attach control listeners after map is created
            attachControlListeners();

            console.log('✅✅✅ Apple Maps fully loaded with custom controls!');
            
        } catch (error) {
            console.error('❌ Error:', error);
            const mapElement = document.getElementById('apple-map');
            if (mapElement) {
                mapElement.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #1c1c1e; color: white; flex-direction: column; gap: 20px; padding: 40px;">
                        <div style="font-size: 48px;">📍</div>
                        <div style="text-align: center;">
                            <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">Clink HQ</div>
                            <div style="font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 4px;">1511 Texas Ave S</div>
                            <div style="font-size: 15px; color: rgba(255,255,255,0.7);">College Station, TX 77840</div>
                            <a href="https://maps.apple.com/?address=1511%20Texas%20Ave%20S,%20College%20Station,%20TX%2077840" 
                               target="_blank" 
                               rel="noopener"
                               style="display: inline-block; margin-top: 20px; padding: 14px 28px; background: linear-gradient(135deg, #E265FF, #c84eeb); color: white; text-decoration: none; border-radius: 16px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(226, 101, 255, 0.4);">
                                Open in Apple Maps
                            </a>
                        </div>
                    </div>
                `;
            }
        }
    }

    function initialize() {
        console.log('📱 DOM ready');
        
        if (typeof mapkit !== 'undefined') {
            console.log('✅ MapKit available');
            initMapKit();
        } else {
            console.log('⏳ Waiting for MapKit...');
            let attempts = 0;
            const checkMapKit = setInterval(function() {
                attempts++;
                if (typeof mapkit !== 'undefined') {
                    console.log('✅ MapKit loaded');
                    clearInterval(checkMapKit);
                    initMapKit();
                } else if (attempts > 30) {
                    console.error('❌ MapKit failed to load');
                    clearInterval(checkMapKit);
                }
            }, 500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
